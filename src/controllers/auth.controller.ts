import { ENV } from "@config";
import { ServerError } from "@errors/ServerError.error.js";
import { logger } from "@logger";
import { User } from "@models/user.model.js";
import {
    generateAccessToken,
    generateAccessTokenFromUser,
    generateRefreshToken,
    verifyRefreshToken,
} from "@services/auth.js";
import { redis } from "@utils/database/redis.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export async function login(
    req: Request<unknown, LoginResponse, LoginRequest>,
    res: Response<LoginResponse>,
): Promise<void> {
    const { username, password } = req.body;

    if (!username || !password)
        throw new ServerError(
            "Username and password are required",
            StatusCodes.BAD_REQUEST,
        );

    const user = await User.findOne({ username }).exec();

    if (!user || !(await user.comparePassword(password)))
        throw new ServerError("Invalid credentials", StatusCodes.UNAUTHORIZED);

    const refreshToken = await generateRefreshToken(user);
    const accessToken = generateAccessTokenFromUser(user);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.OK).json({
        token: accessToken,
    });
}

interface LogoutResponse {
    message: string;
}

export async function logout(
    req: Request,
    res: Response<LogoutResponse>,
): Promise<void> {
    const refreshToken = String(req.cookies.refreshToken);

    if (refreshToken) {
        await redis.del(`refresh:${refreshToken}`);
        res.clearCookie("refreshToken");
    }

    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
}

interface RefreshResponse {
    token: string;
}

export async function refresh(
    req: Request,
    res: Response<RefreshResponse>,
): Promise<void> {
    const refreshToken = String(req.cookies.refreshToken);

    if (!refreshToken)
        throw new ServerError(
            "No refresh token provided",
            StatusCodes.UNAUTHORIZED,
        );

    const payload = await verifyRefreshToken(refreshToken);

    if (!payload)
        throw new ServerError(
            "Invalid refresh token",
            StatusCodes.UNAUTHORIZED,
        );

    const accessToken = generateAccessToken(payload);

    res.status(StatusCodes.OK).json({ token: accessToken });
}

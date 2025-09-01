import { JWT_SECRET } from "@config";
import { ServerError } from "@errors/ServerError.error.js";
import { User } from "@models/user.model.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

interface Payload {
    id: string;
    username: string;
    email: string;
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

    const payload: Payload = {
        id: String(user._id),
        username: user.username,
        email: user.email,
    };

    const token: string = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h",
    });

    res.status(StatusCodes.OK).json({
        token,
    });
}

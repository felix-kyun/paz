import { User } from "@models/user.model.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ServerError } from "@/errors/ServerError.error.js";

interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    age: number;
    password: string;
}

type IUserResponse = Omit<IUser, "password">;
type IUserRequest = Omit<IUser, "id">;
type IUserDB = Omit<IUser, "id"> & { _id: string };

export async function getUserById(
    req: Request<{ id: string }, typeof User, unknown>,
    res: Response<IUserResponse>,
): Promise<void> {
    const { id } = req.params;

    if (!id)
        throw new ServerError("User ID is required", StatusCodes.BAD_REQUEST);

    const user = await User.findById(id).lean<IUserDB>();

    if (!user) throw new ServerError("User not found", StatusCodes.NOT_FOUND);

    res.status(StatusCodes.OK).json({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        age: user.age,
    });
}

export async function createUser(
    req: Request<unknown, IUserResponse, IUserRequest>,
    res: Response<IUserResponse>,
): Promise<void> {
    const { name, username, email, age, password } = req.body;

    if (!name || !username || !password || !age || !email)
        throw new ServerError(
            "Missing required fields",
            StatusCodes.BAD_REQUEST,
        );

    const exsistingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (exsistingUser && exsistingUser.username === username)
        throw new ServerError("Username already exists", StatusCodes.CONFLICT);

    if (exsistingUser && exsistingUser.email === email)
        throw new ServerError("Email already exists", StatusCodes.CONFLICT);

    const user = await User.create({
        name,
        username,
        email,
        age,
        password,
    });

    res.status(StatusCodes.CREATED).json({
        id: String(user._id),
        name,
        username,
        email,
        age,
    });
}

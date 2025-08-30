import type { Request, Response } from "express";
import { User } from "@models/user.model.js";
import { ServerError } from "@/errors/ServerError.error.js";
import { StatusCodes } from "http-status-codes";

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

    if (await User.exists({ username }))
        throw new ServerError("Username already exists", StatusCodes.CONFLICT);

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

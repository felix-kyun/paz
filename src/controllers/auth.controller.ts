import type { Request, Response } from "express";

export async function login(req: Request, res: Response): Promise<void> {
    res.send("Login");
}

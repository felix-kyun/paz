import { Router } from "express";

import { login, logout, refresh } from "@/controllers/auth.controller.js";

export const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);

import { Router } from "express";

import { createUser, getUserById } from "@/controllers/user.controller.js";

export const userRouter: Router = Router();

userRouter.route("/").post(createUser);
userRouter.route("/:id").get(getUserById);

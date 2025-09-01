import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { ENV, PORT } from "@config";
import { logger } from "@logger";
import { notFoundMiddleware } from "@middlewares/notFound.middleware.js";
import { errorHandler } from "@middlewares/error.middleware.js";
import { debugRouter } from "@routes/debug.routes.js";
import { userRouter } from "@routes/user.routes.js";
import { connectMongo } from "@utils/database/mongo.js";
import { authRouter } from "@routes/auth.routes.js";
import { loggerMiddleware } from "@middlewares/logger.middleware.js";

const app: Express = express();

/* Middleware */
app.use(loggerMiddleware);
app.use(cors());
app.use(helmet());
app.use(express.json());

/* Routes */
app.get("/", (_req, res) => res.send("Hello"));
app.use("/users", userRouter);
app.use("/auth", authRouter);

/* Testing Routes */
if (["development", "test"].includes(ENV)) app.use("/debug", debugRouter);

/* Not Found  */
app.use(notFoundMiddleware);

/* Error Handler */
app.use(errorHandler);

/* Database Connection */
await connectMongo();

/* Start Server */
if (ENV !== "test")
    app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
    });

export default app;

import { ENV, PORT } from "@config";
import { logger } from "@logger";
import { csrf } from "@middlewares/csrf.middleware.js";
import { errorHandler } from "@middlewares/error.middleware.js";
import { loggerMiddleware } from "@middlewares/logger.middleware.js";
import { notFoundMiddleware } from "@middlewares/notFound.middleware.js";
import { authRouter } from "@routes/auth.routes.js";
import { debugRouter } from "@routes/debug.routes.js";
import { userRouter } from "@routes/user.routes.js";
import { connectMongo } from "@utils/database/mongo.js";
import { connectRedis } from "@utils/database/redis.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

logger.info("Starting server...");
const app: Express = express();

/* Middleware */
app.use(loggerMiddleware);
app.use(cors());
app.use(cookieParser());
app.use(csrf());
app.use(helmet());
app.use(express.json());

/* Routes */
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
await connectRedis();

/* Start Server */
if (ENV !== "test")
    app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
    });

export default app;

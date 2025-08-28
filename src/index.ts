import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { ENV, PORT } from "@config";
import { logger } from "@logger";
import { httpLogger } from "./utils/logger/httpLogger.js";

const app: Express = express();

/* Middleware */
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(httpLogger);

/* Routes */
app.get("/", async (_req, res) => res.send("Hello"));

/* Testing Routes */

/* Not Found  */

/* Error Handler */

/* MongoDB Connection */

/* Start Server */
if (ENV !== "test")
    app.listen(PORT, () => {
        logger.info(`Server started on port ${PORT}`);
    });

export default app;

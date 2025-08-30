import mongoose from "mongoose";
import { MONGO_URI } from "@config";
import { logger } from "@logger";

export async function connectMongo(): Promise<void> {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info("Connected to Mongo DB");
    } catch (error: unknown) {
        logger.fatal("Failed to connect to Mongo DB");
        logger.fatal(error);
        process.exit(1);
    }
}

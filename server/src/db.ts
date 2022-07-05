import mongoose from "mongoose"
import logger from "./logger"

export default async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/hotstar-clone")
        logger.info("Connected to the database")
    } catch (error) {
        // tslint:disable-next-line:no-console
        logger.error(error)
    }
}
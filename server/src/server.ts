import "dotenv/config";
import connectDB from "./db"
import createApp from "./app";
import logger from "./logger";

const port = process.env.PORT || 4848
const app = createApp();

connectDB()

app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`)
})
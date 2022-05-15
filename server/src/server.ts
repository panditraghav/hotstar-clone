import "dotenv/config";
import connectDB from "./db"
import createApp from "./app";

const port = process.env.PORT || 4848
const app = createApp();

connectDB()

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running at http://localhost:${port}`)
})
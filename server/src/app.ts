import authRouter from "./routes/auth"
import cors from "cors"
import cookieParser from "cookie-parser"
import express, { Express, Request, Response } from "express"
import deserializeUser from "./middleware/deserializeUser"
import showRouter from "./routes/show"
import videoRouter from "./routes/video"
import genreRouter from "./routes/genre"

const corsOptions = {
    origin: ["http://localhost:3000"],
}

export default function createApp(): Express {
    const app = express()

    app.use("*",deserializeUser)
    app.use(cors(corsOptions))
    app.use(express.json())

    app.use("/auth", authRouter)
    app.use("/show", showRouter)
    app.use("/video", videoRouter)
    app.use("/genre", genreRouter)

    return app
}



import authRouter from "./routes/authRouter"
import cors from "cors"
import cookieParser from "cookie-parser"
import express, { Express, Request, Response } from "express"
import deserializeUser from "./middleware/deserializeUser"
import showRouter from "./routes/showRouter"
import videoRouter from "./routes/videoRouter"
import genreRouter from "./routes/genreRouter"
import imageRouter from "./routes/imageRouter"

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001"],
}

export default function createApp(): Express {
    const app = express()

    app.use("*", deserializeUser)
    app.use(cors(corsOptions))
    app.use(express.json())

    app.use("/auth", authRouter)
    app.use("/show", showRouter)
    app.use("/video", videoRouter)
    app.use("/genre", genreRouter)
    app.use("/image", imageRouter)

    return app
}



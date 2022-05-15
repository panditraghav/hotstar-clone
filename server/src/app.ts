import authRouter from "./routes/auth"
import cors from "cors"
import cookieParser from "cookie-parser"
import express, { Express, Request, Response } from "express"
import deserializeUser from "./middleware/deserializeUser"

const corsOptions = {
    origin: ["http://localhost:3000"],
}

export default function createApp(): Express {
    const app = express()

    app.use("*",deserializeUser)
    app.use(cors(corsOptions))
    app.use(express.json())

    app.use("/auth", authRouter)

    return app
}



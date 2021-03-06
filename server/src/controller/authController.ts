import "dotenv/config"
import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { verifyJwt, signJwt, IPayload } from "../utils/jwt";
import User, { IUser } from "../models/User";
import { HydratedDocument } from "mongoose"
import * as bcrypt from "bcrypt"
const secret = process.env.SECRET || "ThisIsMySecret"
import { StatusCodes } from "http-status-codes"
import { MongooseError } from "mongoose";


type AuthReqBodyType = Pick<IUser, "email" | "password">

export async function registerController(req: Request<{}, {}, AuthReqBodyType>, res: Response) {

    if (!(req.body.email && req.body.password))
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid username or password")

    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        res.status(200).json({ message: "Successfully registered" })

    } catch (error) {

        if (error instanceof Error) {
            if (error.message.includes("email"))
                return res.status(StatusCodes.BAD_REQUEST).json({ type: "email", message: "Email already exists" })
        }
        return res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}


export async function loginController(req: Request<{}, {}, AuthReqBodyType>, res: Response) {
    const { email, password } = req.body

    const user: HydratedDocument<IUser> | null = await User.findOne({ email })

    if (!user) return res.status(404).json({ message: "Incorrect username or password" })

    const isRightPassword = await bcrypt.compare(password, user.password)

    if (!isRightPassword) return res.status(403).json({ message: "Incorrect username or password" })

    const payload: IPayload = { uid: user._id.toString(), isAdmin: user.isAdmin }
    const accessToken = signJwt(payload, "7d")
    console.log(accessToken)
    return res.cookie("token", accessToken, {
        httpOnly: false,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "lax"
    }).json(user)
}

export async function authController(req: Request, res: Response) {
    if (res.locals.user) {
        return res.json(res.locals.user)
    }
    return res.json(null)
}
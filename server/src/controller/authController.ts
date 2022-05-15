import "dotenv/config"
import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { verifyJwt } from "../utils/jwt";
import User, { IUser } from "../models/User";
import { HydratedDocument } from "mongoose"
import * as bcrypt from "bcrypt"
const secret = process.env.SECRET || "ThisIsMySecret"

export async function registerController(req: Request, res: Response) {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        res.status(200).json({ message: "Successfully registered" })

    } catch (error) {
        res.status(400).send(error)
    }
}

export async function loginController(req: Request, res: Response) {
    const { email, password } = req.body
    console.log(email, password)

    const user: HydratedDocument<IUser> | null = await User.findOne({ email })

    if (!user) return res.status(404).json({ message: "Incorrect username or password" })

    const isRightPassword = await bcrypt.compare(password, user.password)

    if (!isRightPassword) return res.status(403).json({ message: "Incorrect username or password" })

    const accessToken = jwt.sign({ uid: user._id }, secret, {
        expiresIn: "1d",
    })
    const { payload, isExpired } = verifyJwt(accessToken, secret)
    res.json({ accessToken, payload, isExpired })
}

interface reqUser {
    payload: { uid: string, iat: number, exp: number }
    isExpired: boolean
}
export async function authController(req: Request, res: Response) {
    try {
        //@ts-ignore
        if (req.user?.isExpired) return res.json({ payload: null, isExpired: true })
        res.json(req.user)
    } catch (error) {
        res.json(error)
    }
}
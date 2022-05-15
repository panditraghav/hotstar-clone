import "dotenv/config"
import { Request, Response, NextFunction } from "express"
import * as _ from "lodash"
import { verifyJwt } from "../utils/jwt"

const secret = process.env.SECRET || "ThisIsMySecret"

export default function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers["authorization"]?.split(" ")[1]
    if (!accessToken) return next()
    const { payload, isExpired } = verifyJwt(accessToken, secret)
    // payload?.isExpired = isExpired
    _.set(req, "user", { payload: payload, isExpired })
    return next()
}
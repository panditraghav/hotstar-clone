import "dotenv/config"
import { Request, Response, NextFunction } from "express"
import * as _ from "lodash"
import { verifyJwt } from "../utils/jwt"

const secret = process.env.SECRET || "ThisIsMySecret"

export default function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers["authorization"]?.split(" ")[1]
    if (!accessToken) return next()
    const payload = verifyJwt(accessToken)
    // payload?.isExpired = isExpired
    if (payload) {
        res.locals.user = payload
    }
    return next()
}
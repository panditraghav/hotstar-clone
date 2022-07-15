import "dotenv/config"
import { Request, Response, NextFunction } from "express"
import * as _ from "lodash"
import logger from "../logger"
import { verifyJwt } from "../utils/jwt"


const secret = process.env.SECRET || "ThisIsMySecret"

export default function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies.token
    logger.info(`Access token from cookie: ${accessToken}`)
    if (!accessToken) return next()
    const payload = verifyJwt(accessToken)
    if (payload) {
        res.locals.user = payload
    }
    return next()
}
import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"

export default function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (!res.locals.user) return res.status(StatusCodes.FORBIDDEN).send("You are not signed in")
    if (!res.locals.user.isAdmin) return res.status(StatusCodes.FORBIDDEN).send("You are not a admin")
    next()
}
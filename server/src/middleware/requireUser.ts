import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"

export default function requireUser(req: Request, res: Response, next: NextFunction){
    // console.log(res.locals)
    if(!res.locals.user) return res.status(StatusCodes.FORBIDDEN).send("You are not signed in")
    next()
}
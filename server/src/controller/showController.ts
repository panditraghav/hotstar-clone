import { Request, Response } from "express"
import logger from "../logger"
import { Show, IShow } from "../models/Show"

export async function uploadShowController(req: Request<{}, {}, IShow>, res: Response) {
    try {
        let show = new Show(req.body)
        await show.save()
        return res.json(show)
    } catch (error) {
        return res.json(error)
    }
}
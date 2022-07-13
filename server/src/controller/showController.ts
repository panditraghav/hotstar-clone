import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
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

export async function getShowsByTypeController(req: Request, res: Response) {
    let { type } = req.params
    if (type) {
        let shows = await Show.find({ type })
        return res.send(shows)
    }
    return res.status(StatusCodes.BAD_REQUEST).send("Type required")
}

export async function getShowsByGenreController(req: Request, res: Response) {
    let { genre } = req.params
    if (genre) {
        let shows = await Show.find({ "genres.name": genre })
        return res.send(shows)
    }
    return res.status(StatusCodes.BAD_REQUEST).send("genre required")
}
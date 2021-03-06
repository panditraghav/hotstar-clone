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
        logger.error(error)
        return res.json(error)
    }
}

export async function updateShowController(req: Request<{}, {}, IShow>, res: Response) {
    try {
        let show = await Show.findByIdAndUpdate(req.body._id, req.body)
        return res.json(show)
    } catch (error) {
        logger.error(error)
        return res.json(error)
    }
}

export async function getShowsByTypeController(req: Request, res: Response) {
    let { type } = req.params
    if (type) {
        try {
            let shows = await Show.find({ type })
            return res.json(shows)
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
        }
    }
    return res.status(StatusCodes.BAD_REQUEST).send("Type required")
}

export async function getShowsByGenreController(req: Request, res: Response) {
    let { genre } = req.params
    if (genre) {
        try {
            let shows = await Show.find({ "genres.name": genre })
            return res.json(shows)
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
        }
    }
    return res.status(StatusCodes.BAD_REQUEST).send("genre required")
}

export async function getShowByIdController(req: Request, res: Response) {
    let { id } = req.params
    if (id) {
        try {
            let show = await Show.findOne({ _id: id })
            return res.json(show)
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
        }
    }
    return res.status(StatusCodes.BAD_REQUEST).send("genre required")
}

export async function deleteShowController(req: Request, res: Response) {
    let { id } = req.params
    if (id) {
        try {
            let show = await Show.findByIdAndDelete(id)
            return res.json(show)
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }
}
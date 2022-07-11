import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { IGenre, Genre } from "../models/Genre"

type ReqBody = Omit<IGenre, "_id">

export async function createGenreController(req: Request<{}, {}, ReqBody>, res: Response) {
    if (!req.body.name) return res.status(StatusCodes.BAD_REQUEST).send("Require name of genre")

    try {
        let genre = new Genre(req.body)
        await genre.save()
        return res.json(genre)
    } catch (error) {
        return res.json(error)
    }

}

export async function getGenreController(req: Request, res: Response) {
    let genres = await Genre.find()
    res.json(genres)
}
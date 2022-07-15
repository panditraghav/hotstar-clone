import { Request, Response } from "express"
import busboy from "busboy"
import fs from "fs"
import { getImagePath } from "../services/imageService"
import { customAlphabet } from "nanoid"
import { StatusCodes } from "http-status-codes"

const nanoid = customAlphabet("12345678890abcdefghijklmnopqrstuvwxyz", 10)

export function uploadImageController(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers })
    const fileName = nanoid()
    let extension: string = ""

    bb.on("file", (name, file, info) => {
        extension = info.mimeType.split("/")[1]
        const imagePath = getImagePath(fileName, extension)
        file.pipe(fs.createWriteStream(imagePath))
    })

    bb.on("close", () => {
        res.writeHead(StatusCodes.CREATED, {
            Connection: "closed",
            "Content-Type": "application/json"
        })
        res.write(JSON.stringify({ fileName, extension }))
        res.end()
    })
    return req.pipe(bb)
}

export function getImageController(req: Request, res: Response) {
    const { fileName, extension } = req.params
    const imagePath = getImagePath(fileName, extension)

    res.sendFile(imagePath)
}
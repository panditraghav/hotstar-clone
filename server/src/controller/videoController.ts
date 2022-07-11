import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import fs, { appendFile } from "fs"
import { customAlphabet } from "nanoid"
import logger from "../logger"
import { getVideoPath } from "../services/videoService"
import busboy from "busboy"
import { CorsRequest } from "cors"

const nanoid = customAlphabet("12345678890abcdefghijklmnopqrstuvwxyz", 10)

const CHUNK_SIZE = 1024 * 1024

export function uploadVideoController(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers })
    const fileName = nanoid()
    let extension: string = ""

    bb.on("file", (name, file, info) => {
        const { mimeType } = info
        extension = mimeType.split("/")[1]
        const videoPath = getVideoPath(fileName, extension)
        file.pipe(fs.createWriteStream(videoPath))
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


export function streamVideoController(req: Request, res: Response) {
    const range = req.headers.range
    const { fileName, mimeType } = req.params
    if (!range) return res.status(StatusCodes.BAD_REQUEST).send("Range header required")
    if (!(fileName && mimeType)) return res.status(StatusCodes.BAD_REQUEST).send("Invalid url")

    const extension = mimeType.split("/")[1]
    const videoPath = getVideoPath(fileName, extension)
    const videoSize = fs.statSync(videoPath).size
    const chunkStart = Number(range.replace(/\D/g, ""))
    const chunkEnd = Math.min(chunkStart + CHUNK_SIZE, videoSize - 1)
    const contentLength = chunkStart - chunkEnd + 1

    const headers = {
        "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
        "Access-Control-Allow-Origin": "cross-origin"
    }

    res.writeHead(206, headers)

    const videoStream = fs.createReadStream(videoPath, {
        start: chunkStart,
        end: chunkEnd
    })
    videoStream.pipe(res)
}
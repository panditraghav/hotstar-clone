import * as jwt from "jsonwebtoken"
import logger from "../logger"

const secretKey = "this is my secret key"

export function signJwt(uid: string, expiresIn: string | number) {

    return jwt.sign({ uid }, secretKey, {
        expiresIn
    })
}

export function verifyJwt(token: string) {
    let payload = null
    let isExpired = null
    try {
        payload = jwt.verify(token, secretKey)
        return payload
    } catch (error: any) {
        logger.error(error)
        isExpired = error.message === "jwt expired"
        return null
    }
}
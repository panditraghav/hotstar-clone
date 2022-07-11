import * as jwt from "jsonwebtoken"
import logger from "../logger"

const secretKey = "this is my secret key"

export interface IPayload {
    uid: string,
    isAdmin: boolean
}

export function signJwt(payload: IPayload, expiresIn: string | number) {
    return jwt.sign( payload, secretKey, {
        expiresIn
    })
}

export function verifyJwt(token: string) {
    let payload = null
    try {
        payload = jwt.verify(token, secretKey)
        return payload
    } catch (error: any) {
        logger.error(error)
        return null
    }
}
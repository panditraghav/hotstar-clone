import * as jwt from "jsonwebtoken"

const secretKey = "this is my secret key"

export function signJwt(payload: string, expiresIn: string | number) {
    return jwt.sign(payload, secretKey, {
        expiresIn
    })
}

export function verifyJwt(token: string, secretOrKey: string) {
    var payload = null 
    var isExpired = null
    try {
        payload = jwt.verify(token, secretOrKey)
    } catch (error: any) {
        isExpired = error.message === "jwt expired"
    }

    return { payload, isExpired }
}
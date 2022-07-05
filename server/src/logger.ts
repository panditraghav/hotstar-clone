import pino from "pino"

let logger = pino({
    transport: {
        target: "pino-pretty"
    }
})

export default logger
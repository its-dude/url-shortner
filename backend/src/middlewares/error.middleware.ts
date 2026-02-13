import { ErrorRequestHandler } from "express"
import { randomUUID } from "node:crypto"

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
   const requestId = randomUUID
   
    console.error({
        requestId,
        message: err.message,
        location: err.location,
        route: req.originalUrl,
        method: req.method,
        stack: err.stack
    })

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: "fail",
            message: err.message,
            requestId,
        })
    }

    return res.status(err.statusCode).json({
        status: "fail",
        message: "Internal Server Error",
        requestId,
    })
}
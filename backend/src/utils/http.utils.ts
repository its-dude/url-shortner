import { Request } from "express"

export function getClientIp (req: Request): string {
    const forwarded = req.headers['x-forwarded-for']

    if ( typeof(forwarded) === 'string') {
        const ip = forwarded.split(',')[0];
        return ip? ip.trim() : "unknown"
    }

    return req.socket.remoteAddress || 'unknown'
}
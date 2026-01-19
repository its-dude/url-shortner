import {Request, Response, NextFunction } from "express";
import { getRedisClient } from "../lib/redis";
import { getClientIp } from "../utils/http.utils";
import { config } from "../config/config";

export const rateLimit = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const redis = getRedisClient()
        const ip = getClientIp(req)
        const windowMs = 60*1000
        const windowSeconds = 60
        const key = `rate_limit:${ip}`
    
        const count = await redis.incr(key)
    
        if (count === 1) {
            await redis.expire(key, windowSeconds)
        }
    
        if ( count > config.rateLimit) {
          const ttl = await redis.ttl(key);
          const retryAfter = ttl > 0 ? ttl : windowSeconds;
    
          res.setHeader("Retry-After", retryAfter.toString());
          
          return res.status(429).json({
            message: "Too many requests",
            error: "Rate limit exceeded",
            retryAfter,
          });        
        }
    
        const ttl = await redis.ttl(key)
        const remaining = Math.max(0, config.rateLimit - count)
        const resetTime = Date.now() + ttl > 0? ttl*1000 : windowMs
    
        res.setHeader('X-RateLimit-Limit', config.rateLimit.toString())
        res.setHeader('X-RateLimit-Remaining', remaining.toString())
        res.setHeader('X-RateLimit-Reset', new Date(resetTime).toISOString())
        
        next()
    }catch(error: any){
        console.log("Rate limiting error: ", error.message)
        next()
    }
}
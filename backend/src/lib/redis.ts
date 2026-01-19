import { createClient, RedisClientType } from "redis"
import { config } from "../config/config"

let redisClient: RedisClientType | null = null

function getRedisClient(): RedisClientType {
    if (!redisClient){
        redisClient = createClient({url: config.redisUrl})

        redisClient.on('error', (err) => {
            console.log("Redis error: ", err.message)
        })

        redisClient.connect()
        .then(() => {
            console.log("Redis db connected")
        })
        .catch((err)=>{
            console.error("Redis connection failed: ", err.message)
        })
    }

    return redisClient
}

async function diconnectRedis(): Promise<void>{
    if (redisClient && redisClient.isOpen) {
        await redisClient.quit();
        redisClient = null;
    }
}

export {diconnectRedis, getRedisClient}
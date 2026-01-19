import dotenv from "dotenv"
dotenv.config()

interface JWTConfig {
  secret: string;
  expiresIn: string | number;
}

interface Config {
  port: number;
  jwt: JWTConfig;
  dbUrl: string;
  redisUrl: string;
  rateLimit: number
}

export const config: Config = {
    port: Number(process.env.PORT) || 3000,
    jwt: {
        secret: process.env.JWT_SECRET|| 'mysecretpassword',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    },
    dbUrl: process.env.DATABASE_URL || "postgres://localhost:5432/myurldb",
    redisUrl: process.env.REDIS_URL || "http://localhost:6379",
    rateLimit: Number(process.env.RATE_LIMIT) || 50
}
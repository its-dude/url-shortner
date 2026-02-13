import { app } from "./app"
import { prisma } from "./lib/prisma";
import { config } from "./config/config";
import {initGeoIP } from "./middlewares/geoIp.middleware";
import { getRedisClient } from "./lib/redis";

try {
  getRedisClient();
} catch (error) {
  console.error("Failed to initialize Redis:", error);
  process.exit(1);
}

let server:any;
async function startServer() {
    try {
        await prisma.$connect()
        console.log("DB connected successfully")

        await initGeoIP()

        server = app.listen(config.port, () => {
            console.log(`Server is running on ${config.port}`)
        })

        server.timeout = 30000      // 30 second timeout
        server.keepAliveTimeout = 61000  // Keep connections alive

    } catch (err: any) {
        console.log("shutting down... :")
        console.log("err: ", err.message)
        process.exit(1)
    }
}

startServer()

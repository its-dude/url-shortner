import express from "express";
import { authRouter } from "./routes/auth.routes";
import { usersRouter } from "./routes/users.routes";
import { urlsRouter } from "./routes/urls.routes";
import { prisma } from "./lib/prisma";
import { config } from "./config/config";
import { UrlController } from "./controllers";
import { geoMiddleware, initGeoIP } from "./middlewares/geoIp.middleware";

const app = express();

app.get('/ping', (_, res) => {
    res.status(200).send('pong')
})
app.get('/health', (_, res)=> {
    res.status(200).json({
        "message": "Health is fine."
    })
})


app.use(express.json())
app.use('/auth',authRouter)
app.use('/users', usersRouter)
app.use('/urls', urlsRouter)

app.get('/:code', geoMiddleware, UrlController.redirectUrl)

async function startServer() {
    try {
        await prisma.$connect()
        console.log("DB connected successfully")

        await initGeoIP()

        const server = app.listen(config.port, () => {
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

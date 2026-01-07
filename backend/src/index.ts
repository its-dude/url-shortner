import express from "express";
import { authRouter } from "./routes/auth.routes";
import { usersRouter } from "./routes/users.routes";
import { urlsRouter } from "./routes/urls.routes";
import { prisma } from "./lib/prisma";
import { config } from "./config/config";
import { UrlController } from "./controllers";

const app = express();



app.use(express.json())
app.use('/auth',authRouter)
app.use('/users', usersRouter)
app.use('/urls', urlsRouter)

app.get('/health', (_, res)=> {
    res.json({
        "message": "Health is fine."
    })
})

app.get('/:code',UrlController.redirectUrl)

async function startServer() {
    try {
        await prisma.$connect()

        console.log("DB connected successfully")

        app.listen(config.port, () => {
            console.log(`Server is running on ${config.port}`)
        })

    } catch (err: any) {
        console.log("DB connection failed, shutting down...")
        process.exit(1)
    }
}

startServer()

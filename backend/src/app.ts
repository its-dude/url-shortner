import express from "express"
import { authRouter } from "./routes/auth.routes"
import { usersRouter } from "./routes/users.routes"
import { urlsRouter } from "./routes/urls.routes"
import { UrlController } from "./controllers"
import { geoMiddleware} from "./middlewares/geoIp.middleware"
import { rateLimit } from "./middlewares/rate-limit.middleware"
import { errorMiddleware } from "./middlewares/error.middleware"

const app = express();

app.use(rateLimit)

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

app.use(errorMiddleware)

export {app}

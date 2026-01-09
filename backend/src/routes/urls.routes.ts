import express from "express"
import { UrlController } from "../controllers"
import { userAuth } from "../middlewares/auth.middleware"

const urlsRouter = express.Router()

urlsRouter.post('/shorten',userAuth ,UrlController.shortenUrl)

urlsRouter.get('/:code/analytics',userAuth ,UrlController.getUrlAnalytics)

urlsRouter.delete('/:code',userAuth ,UrlController.removeUrl)



export {urlsRouter}
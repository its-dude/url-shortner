import express from "express"
import { UrlController } from "../controllers"

const urlsRouter = express.Router()

urlsRouter.post('/shorten', UrlController.shortenUrl)

urlsRouter.get('/:code', UrlController.redirectUrl)

urlsRouter.delete('/:code', UrlController.removeUrl)

urlsRouter.get('/:code/analytics', UrlController.getUrlAnalytics)


export {urlsRouter}
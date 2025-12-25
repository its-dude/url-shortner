import express from "express"
import { UrlController } from "../controllers"

const urlsRouter = express.Router()

urlsRouter.post('/shorten', UrlController.shortenUrl)

urlsRouter.get('/:code', UrlController.redirectUrl)

urlsRouter.get('/:code/analytics', (req, res) => {

})

urlsRouter.delete('/:code', UrlController.removeUrl)


export {urlsRouter}
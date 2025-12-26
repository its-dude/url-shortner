import express from "express"
import { UserController } from "../controllers"

const usersRouter = express.Router()

usersRouter.get('/me/urls', UserController.getUserUrls)

usersRouter.get('/profile', UserController.getUserProfile)

usersRouter.delete('/profile', UserController.deleteUserProfile)


export {usersRouter}
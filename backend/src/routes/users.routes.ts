import express from "express"
import { UserController } from "../controllers"
import { userAuth } from "../middlewares/auth.middleware"

const usersRouter = express.Router()

usersRouter.get('/me/urls',userAuth, UserController.getUserUrls)

usersRouter.get('/profile',userAuth , UserController.getUserProfile)

usersRouter.delete('/profile',userAuth, UserController.deleteUserProfile)


export {usersRouter}
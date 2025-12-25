import express from "express"
import { Usercontroller } from "../controllers"

const usersRouter = express.Router()

usersRouter.get('/me/urls', Usercontroller.getUserUrls)

usersRouter.get('/profile', (req, res) => {

})

usersRouter.delete('/profile', (req, res) => {

})


export {usersRouter}
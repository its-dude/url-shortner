import type { Request, Response } from "express"
import { UrlService, UserService } from "../services"

const getUserUrls =  (req: Request, res: Response) => {
    try{
        const urls = UrlService.getUserUrls(req.user.id)
        return res.json({urls})
    }catch (err: any) {
        return res.status(400).json({message: err.message})
    }
}

const getUserProfile = async (req: Request, res: Response) => {
    try{
        const user = await  UserService.getUserProfile(req.user.id)
        
        res.json({
            user: {
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email
            }
        })

    }catch (err: any) {
        return res.status(400).json({message: err.message})
    }
}

const deleteUserProfile = async (req: Request, res: Response) => {
    try{
        const deletedUser = await UserService.deleteUser(req.user.id)

        res.json({
            user: {
                firstName: deletedUser?.firstName,
                lastName: deletedUser?.lastName,
                email: deletedUser?.email
            }
        })        

    }catch (err: any) {
        return res.status(400).json({message: err.message})
    }
}

export {getUserUrls, getUserProfile, deleteUserProfile}
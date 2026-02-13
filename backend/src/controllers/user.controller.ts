import type { Request, Response } from "express"
import { UrlService, UserService } from "../services"
import { catchAsync } from "../utils/catchAsync"

const getUserUrls = catchAsync(async (req: Request, res: Response) => {
    const urls = await UrlService.getUserUrls(req.user.id)
    return res.json({ urls })
})

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const user = await UserService.getUserProfile((req.user!).id)

    res.json({
        user: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email
        }
    })

})

const deleteUserProfile = catchAsync(async (req: Request, res: Response) => {
    const deletedUser = await UserService.deleteUser((req.user!).id)

    res.json({
        user: {
            firstName: deletedUser?.firstName,
            lastName: deletedUser?.lastName,
            email: deletedUser?.email
        }
    })
})

export { getUserUrls, getUserProfile, deleteUserProfile }
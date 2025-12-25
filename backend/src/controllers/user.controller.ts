import type { Request, Response } from "express"
import { UrlService } from "../services"

const getUserUrls = async (req: Request, res: Response) => {
    try{
        const urls = UrlService.getUserUrls(req.user.id)
        return res.json({urls})
    }catch (err: any) {
        return res.status(400).json({message: err.message})
    }
}

export {getUserUrls}
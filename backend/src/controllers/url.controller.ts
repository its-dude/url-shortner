import type { Request, Response }  from "express"
import { UrlService } from "../services";

interface ShortenUrlBody {
  originalUrl: string;
}

const shortenUrl = async (req: Request<{}, {}, ShortenUrlBody>, res: Response) => {
    try{
        const originalUrl = req.body.originalUrl
        
        if ( !originalUrl ) {
            return  res.status(400).json({ message: "original url is required" })
        }
        
        const shortUrl = await UrlService.generateShortUrl({originalUrl, userId: (req.user!).id});

        return res.status(201).json({
            shortUrl: shortUrl.code
        })

    }catch (err: any) {
        return res.status(400).json({message: err.message})
    }

}

const redirectUrl = async (req: Request, res: Response) => {
    try{
        
        if ( !req.params.code || req.params.code!.length === 6) {
            return res.status(400).json({message: "Invalid short Url"})
        }

        const originalUrl = await UrlService.resolveShortCode(req.params.code)
        res.redirect(originalUrl)
    }catch (err: any) {
        return res.status(404).json({message: err.message})
    }
}

const removeUrl = async (req: Request, res: Response) => {
    try{
        const deletedUrl = await UrlService.deleteUrl( req.params.code! )
        return res.json( {deletedUrl} )
    }catch (err: any) {
        return res.status(400).json({message: err.message})
    }
}

const getUrlAnalytics = async (req: Request, res: Response) => {
    try{
        const analytics = await UrlService.getAnalytics(req.params.code!)
        return analytics        
    }catch (err: any) {
        return res.status(400).json({message: err.message})
    }
}

export {shortenUrl, redirectUrl, removeUrl, getUrlAnalytics }
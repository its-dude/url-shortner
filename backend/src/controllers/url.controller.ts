import type { Request, Response }  from "express"
import { UrlService, urlAnalysisService } from "../services";
import { getClientIp } from "../utils/http.utils";



const shortenUrl = async (req: Request, res: Response) => {
    try{
        const originalUrl = req.body.originalUrl
        
        if ( !originalUrl ) {
            return  res.status(400).json({ message: "original url is required" })
        }
        
        const shortUrl = await UrlService.generateShortUrl({originalUrl, userId: (req.user)!.id});

        return res.status(201).json({
            shortUrl: shortUrl.code
        })

    }catch (err: any) {
        return res.status(400).json({message: err.message})
    }

}

const redirectUrl = async (req: Request, res: Response) => {
    try{
        
        if ( !req.params.code || req.params.code.length !== 6) {
            return res.status(400).json({message: "Invalid short Url"})
        }
        
        const timestamp = new Date()

        urlAnalysisService.trackClick({
            ip: req.clientIp!,
            countryCode: req.geo?.countryCode!,
            code: req.params.code,
            timestamp
        })
        .catch(err => {
            console.error("Failed to track click:", err);
        });

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
        const analytics = await urlAnalysisService.getAnalytics(req.params.code!)
        return res.json(analytics)        
    }catch (err: any) {
        return res.status(400).json({message: err.message})
    }
}

export {shortenUrl, redirectUrl, removeUrl, getUrlAnalytics }
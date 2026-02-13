import type { Request, Response } from "express"
import { UrlService, urlAnalysisService } from "../services";
import { getClientIp } from "../utils/http.utils";
import { catchAsync } from "../utils/catchAsync";



const shortenUrl = catchAsync(async (req: Request, res: Response) => {

    const originalUrl = req.body.originalUrl

    if (!originalUrl) {
        return res.status(400).json({ message: "original url is required" })
    }

    const shortUrl = await UrlService.generateShortUrl({ originalUrl, userId: (req.user)!.id });

    return res.status(201).json({
        shortUrl: shortUrl.code
    })

})

const redirectUrl = catchAsync(async (req: Request, res: Response) => {
    if (!req.params.code || req.params.code.length !== 6) {
        return res.status(400).json({ message: "Invalid short Url" })
    }

    const timestamp = new Date()

    urlAnalysisService.trackClick({
        ip: req.clientIp!,
        countryCode: req.geo?.countryCode!,
        code: req.params.code,
        timestamp
    })

    const originalUrl = await UrlService.resolveShortCode(req.params.code)

    res.redirect(originalUrl)
})

const removeUrl = catchAsync(async (req: Request, res: Response) => {
    const deletedUrl = await UrlService.deleteUrl(req.params.code!)
    return res.json({ deletedUrl })

})

const getUrlAnalytics = catchAsync(async (req: Request, res: Response) => {
    const analytics = await urlAnalysisService.getAnalytics(req.params.code!)
    return res.json(analytics)

})

export { shortenUrl, redirectUrl, removeUrl, getUrlAnalytics }
import { generateShortCode } from "../utils/shortcode.utils"
import { normalizeAndValidateUrl } from "../utils/url.utils"
import { UrlRepository} from "../repositories"

const generateShortUrl =  ( {originalUrl, userId}: {originalUrl:string, userId: number} ) => {
    const validateUrl = normalizeAndValidateUrl( originalUrl )
    
    const code =  generateShortCode()

    return UrlRepository.createUrl({
            originalUrl: validateUrl,
            userId,
            code
    })
}

const resolveShortCode = async ( code: string ) => {
    const url = await UrlRepository.findUrlByCode(code)

    if ( !url ) {
        throw new Error("Short code not found")
    }

    return url.originalUrl
}

const getUserUrls = async ( userId: number ) => {
    const urls = await UrlRepository.findUrlsByUserId( userId )
    return urls
}

const deleteUrl = async ( code: string ) => {
  try {
    return await UrlRepository.deleteUrlByCode( code );
  } catch ( err: any ) {
    throw new Error("Url not found");
  }
    
}
export {generateShortUrl, resolveShortCode, getUserUrls, deleteUrl}
 
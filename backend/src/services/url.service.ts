import { generateShortCode } from "../utils/shortcode.utils"
import { normalizeAndValidateUrl } from "../utils/url.utils"
import { createUrl, findUrlByCode, findUrlsByUserId, deleteUrlByCode} from "../repositories/urls.repository"

const generateShortUrl =  ( {originalUrl, userId}: {originalUrl:string, userId: number} ) => {
    const validateUrl = normalizeAndValidateUrl( originalUrl )
    
    const code =  generateShortCode()

    return createUrl({
            originalUrl: validateUrl,
            userId,
            code
    })
}

const resolveShortCode = async ( code: string ) => {
    const url = await findUrlByCode(code)

    if ( !url ) {
        throw new Error("Short code not found")
    }

    return url.originalUrl
}

const getUserUrls =  ( userId: number ) => {
    return findUrlsByUserId( userId )
}

const deleteUrl = async ( code: string ) => {
  try {
    return await deleteUrlByCode( code );
  } catch ( err: any ) {
    throw new Error("Url not found");
  }
    
}
export {generateShortUrl, resolveShortCode, getUserUrls, deleteUrl}
 
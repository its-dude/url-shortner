import { generateShortCode } from "../utils/shortcode.utils"
import { normalizeAndValidateUrl } from "../utils/url.utils"
import { UrlRepository} from "../repositories"
import {getRedisClient} from "../lib/redis"

const redis = getRedisClient()

const generateShortUrl = async ({ originalUrl, userId }: { originalUrl: string, userId: number }) => {
  const validateUrl = normalizeAndValidateUrl(originalUrl)

  const code = generateShortCode()

  const url = await UrlRepository.createUrl({
    originalUrl: validateUrl,
    userId,
    code
  })

  try {
    await redis.set(
      `shortUrl:${code}`,
      validateUrl,
      {
        expiration: {
          type: "EX",
          value: 24 * 60 * 60
        }
      }
    )
  } catch (error: any) {
    console.log("Redis cache set failed: ", error.message)
  }

  return url;
}

const resolveShortCode = async ( code: string ) => {
    
    const cachedUrl = await redis.get(`shortUrl:${code}`);

    if (cachedUrl) {
      return cachedUrl
    }

    const url = await UrlRepository.findUrlByCode(code)

    if ( !url ) {
        throw new Error("Short code not found")
    }

  await redis.set(
    `shortUrl:${code}`,
    url.originalUrl,
    {
      expiration: {
        type: "EX",
        value: 24 * 60 * 60
      }
    }
  )
  
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
 
import { NextFunction, Request, Response } from "express"
import maxmind, {Reader, CountryResponse} from "maxmind"
import { getClientIp } from "../utils/http.utils"
import path from "path"

let lookup: Reader<CountryResponse> | null = null

export async function initGeoIP() {
  const dbPath = path.join(process.cwd(), "geolite","GeoLite2-Country.mmdb")
  
  lookup = await maxmind.open<CountryResponse>(
    dbPath
  );

  if (!lookup) {
    throw new Error ("Failed initializing GeoIp")
  }
}

export function geoMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!lookup) return "ZZ";
  const ip = getClientIp(req)
  const geo = lookup.get(ip);
  
  req.clientIp = ip
  req.geo = {
    countryCode: geo?.country?.iso_code || "ZZ"
  };

  next()
}


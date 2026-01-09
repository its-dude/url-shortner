import { CountryRepository, UrlAnalysisRepository, UrlRepository } from "../repositories"

const trackClick = async (data: {
    ip: string,
    countryCode: string,
    code: string,
    timestamp: Date
})=>{
    const url = await UrlRepository.findUrlByCode(data.code);

    if (!url) {
     throw new Error("Analysis error, invalid Url")
    }

    const country = await CountryRepository.findCountryByCode(data.countryCode)

   const click = await UrlAnalysisRepository.createNewClick({
        ip: data.ip,
        countryId: country?.id!,
        clickedAt: data.timestamp,
        urlId: url.id
    }) 

}

const getAnalytics = async ( code: string ) => {
    const url = await UrlRepository.findUrlByCode( code )

    if ( !url ) {
       throw new Error("Url doesn't exist")
    }

    const clicksAnalyis = await UrlAnalysisRepository.findUrlClickAnalytics( url.id )
    return {
      totalClicks: clicksAnalyis.length
    }
}

export {getAnalytics, trackClick}
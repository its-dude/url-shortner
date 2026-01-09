import {prisma} from "../lib/prisma"

const findCountryByCode = (countryCode: string) => {
    return prisma.country.findUnique({
       where:{
         code:countryCode
       }
    })
}

export {findCountryByCode}
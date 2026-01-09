import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

const createNewClick = (data:{
    ip: string,
    countryId: number,
    urlId: number
    clickedAt: Date
}) => {
   return prisma.urlClickAnalysis.create({data})
}

const findUrlClickAnalytics = ( urlId: number ) => {
    return prisma.urlClickAnalysis.findMany({
        where: {urlId}
    })
}

export {createNewClick, findUrlClickAnalytics}
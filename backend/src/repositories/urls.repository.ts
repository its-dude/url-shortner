import { prisma } from "../lib/prisma";

const createUrl =  (data: {
    originalUrl: string,
    userId: number,
    code: string
}) => {
    return prisma.url.create({data})
}

const findUrlByCode =  ( code: string) : Promise<{ originalUrl: string, code: string, userId: number } | null> => {
    return prisma.url.findUnique({
        where: {code},
        select: {
            id: true,
            originalUrl: true,
            code: true,
            userId: true
        }
    })
}

const findUrlAnalytics = ( id: number ) => {
    return prisma.urlAnalytics.findUnique({
        where: {id}
    })
}

const findUrlsByUserId =  ( userId: number) => {
    return prisma.url.findMany({
        where: {userId},
        select: {
            id: true,
            code: true,
            originalUrl: true
        }
    })
}

const deleteUrlByCode =  ( code: string ) => {
    return prisma.url.delete({
        where: {code}
    })
}
export {createUrl, findUrlByCode, findUrlsByUserId, findUrlAnalytics, deleteUrlByCode}


import { prisma } from "../lib/prisma";

export const createUser = async (data:{
    firstName: string,
    lastName: string,
    email: string,
    password: string
})=>{

    return prisma.user.create({data});
}

export const findUserByEmail = async (email:string) => {
    return prisma.user.findUnique({
        where: {email}
    })
}

export const findUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: {id},
    })
}
import { prisma } from "../lib/prisma";

export const createUser =  (data:{
    firstName: string,
    lastName: string,
    email: string,
    password: string
})=>{

    return prisma.user.create({data});
}

export const findUserByEmail =  (email:string) => {
    return prisma.user.findUnique({
        where: {email}
    })
}

export const findUserById =  (id: number) => {
    return prisma.user.findUnique({
        where: {id},
    })
}

export const deleteUserById = (id: number) => {
    return prisma.user.delete({
        where: {id}
    })
}
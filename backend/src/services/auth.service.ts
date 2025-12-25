import { createUser, findUserByEmail, findUserById } from "../repositories/users.repository"
import bcrypt from "bcrypt"

 const getUserFromToken = async (userId: number) =>{
    const user = await findUserById(userId)

    if (!user) {
        return null
    } else {
        return user
    } 
}

 const signinService = async (
    email: string,
    password: string
) => {

    const user = await findUserByEmail(email)

    if (!user) {
        throw new Error("Invalid email or password")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }


    return user;
}

const signupService = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
) => {

    const existingUser = await findUserByEmail(email)

    if (existingUser) {
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    return user;
}

export {getUserFromToken, signinService, signupService}
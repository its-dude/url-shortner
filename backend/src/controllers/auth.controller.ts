import type { Request, Response } from "express";

import { AuthService } from "../services"
import { config } from "../config/config"

import jwt, { Secret } from "jsonwebtoken"
import { catchAsync } from "../utils/catchAsync";

const signin = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await AuthService.signinService(
        email,
        password
    )

    const token = jwt.sign({ userId: user.id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn as number })

    res.json({
        message: "login successful",
        token
    })

}
)

const signup = catchAsync(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const user = await AuthService.signupService(
        firstName,
        lastName,
        email,
        password
    )

    res.status(201).json({
        message: "user created successfully",
        user: {
            id: user.id,
            email: user.email
        }
    })


})

export { signin, signup }
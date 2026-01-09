import type { Request, Response } from "express";

import {AuthService} from "../services"
import {config} from "../config/config"

import jwt, { Secret } from "jsonwebtoken"

const signin= async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        
        const user = await AuthService.signinService(
                     email,
                     password
                    )
        
        const token = jwt.sign({userId: user.id}, config.jwt.secret, {expiresIn: config.jwt.expiresIn as number})   

        res.json({
            message: "login successful",
            token
        })

    }catch (err: any) {
        res.status(400).json({message: "Try again"})
    }
} 

const signup = async (req: Request, res: Response) => {
    try{
        const {firstName, lastName, email, password} = req.body;
        
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

    }catch (err: any) {
        res.status(400).json({message: err.message})
    }
} 

export {signin, signup}
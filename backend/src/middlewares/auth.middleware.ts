import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { resolveSoa } from "node:dns"
import { getUserFromToken } from "../services/auth.service"
import { config } from "../config/config"

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let  authHeader = req.headers['authorization']
        
        if ( !authHeader ) {
            return res.status(401).json({message: "No token provided"})
        }
    
        const [scheme, token] = authHeader.split(' ')
        
        if ( scheme !== 'Bearer' || !token) {
            return res.status(401).json({message: "Invalid Authorization format"})
        }
    
        const decodedToken = jwt.verify(token, config.jwt.secret) as { userId: number}
    
        const user = await getUserFromToken(decodedToken.userId)
    
        if ( !user ) {
            return res.sendStatus(401)
        }
    
        req.user = user 
        next()
    }catch (err: any) {
        return res.sendStatus(401)
    }
}
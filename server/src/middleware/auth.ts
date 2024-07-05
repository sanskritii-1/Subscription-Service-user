import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getEnvVariable } from "../utils";
import { config } from "../config/appConfig";

declare module "jsonwebtoken" {
    export interface JwtPayload {
        id: string;
    }
}

export interface CustomRequest extends Request{
    id?: string | JwtPayload;
}


// authorization for accessing a website
export const authMiddleware = (req: CustomRequest, res:Response, next: NextFunction) => {
    
    try {
        // checking for access token in authorization Bearer
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];
        if(!token){
            return next({status:401, message: "Token not found: Unauthorised access"})
        }
        
        // checking validity of access token and adding payload (user info) to req
        const accessSecret = getEnvVariable(config.ACCESS_TOKEN_SECRET);
        const payloadData = <JwtPayload>jwt.verify(token, accessSecret);
        req.id = payloadData;
        // console.log("payloadData in auth middleware: ", payloadData);
        next();
    } catch (err) {
        next(err);
    }
};


// Function to generate access token
export const generateAccessToken = (payload: JwtPayload): string => {
    try {
        const accessSecret = getEnvVariable(config.ACCESS_TOKEN_SECRET);
        return jwt.sign(payload, accessSecret, { expiresIn: '15d' });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

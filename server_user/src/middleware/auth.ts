// handling tokens
import {Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getAcessTokenSecret } from "../utils";

declare module "jsonwebtoken" {
    export interface JwtPayload {
        id: string;
    }
}

interface CustomRequest extends Request{
    id?: string | JwtPayload;
}


// authorization for accessing a website
export const authMiddleware = (req: CustomRequest, res:Response, next: NextFunction) => {
    // checking for access token in authorization Bearer
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if(!token){
        return res.status(401).json({error: "Token not found"})
    }

    // checking validity of access token and adding payload (user info) to req
    try {
        const accessSecret = getAcessTokenSecret();
        const payloadData = <JwtPayload>jwt.verify(token, accessSecret);
        req.id = payloadData;
        console.log("payloadData: ", payloadData);
        next();
    } 
    catch (err) {
        console.log(err);
        res.status(403).json({error: "Invalid token"});
        // if access secret is not set
        // res.status(500).json({error: err.message});
    }
}


// creating an access token
export const generateAccessToken = (payload:JwtPayload) => {
    try {
        const accessSecret = getAcessTokenSecret();
        return jwt.sign(payload, accessSecret, {expiresIn: '15d'});
    } catch (err) {
        throw err;
    }
}
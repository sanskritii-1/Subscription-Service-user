import {Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getAcessTokenSecret } from "../utils";


interface CustomRequest extends Request{
    id?:string | JwtPayload;
}

// authorization for accessing a website
export const authMiddleware = (req: CustomRequest, res:Response, next: NextFunction) => {
    // checking for access token in authorization Bearer
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if(!token){
        return res.json({error: "Token not found"})
    }

    // checking validity of access token and getting the payload (user info)
    try {
        const accessSecret = getAcessTokenSecret();
        const payloadData = jwt.verify(token, accessSecret);
        req.id = payloadData;
        console.log("payloadData: ", payloadData);
        next();
    } 
    catch (err) {
        console.log(err);
        res.json({error: "Invalid token"});
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
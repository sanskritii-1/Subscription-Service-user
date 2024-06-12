import {Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { config } from "../config/appConfig";
import { getAcessTokenSecret } from "../utils";

// -------------------------
// interface CustomJwtPayload extends JwtPayload {
//     id: string,
// }

interface CustomRequest extends Request{
    id?:string | JwtPayload;
}

export const authMiddleware = (req: CustomRequest, res:Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if(!token){
        return res.json({error: "Token not found"})
    }

    // if(!config.ACCESS_TOKEN_SECRET) return res.json({error: "Access Token Secret not set"});

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


export const generateAccessToken = (payload:JwtPayload) => {
    try {
        const accessSecret = getAcessTokenSecret();
        return jwt.sign(payload, accessSecret, {expiresIn: '15min'});
    } catch (err) {
        throw err;
    }
}
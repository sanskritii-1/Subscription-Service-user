import user from "../models/user";
import jwt from "jsonwebtoken";
// import { config } from "../config/appConfig";
import { Request, Response } from "express";
import { registerValidationSchema } from "../validations/userValidation";
import { getAcessTokenSecret, getRefreshTokenSecret } from "../utils";
// import { generateAcessToken } from "../middleware/auth";

export const register = async (req: Request, res: Response):Promise<Response> => {
    const {error} = registerValidationSchema.validate(req.body);
    
    if(error){
        return res.json({error: error.details[0].message});
    }
    
    const data = req.body;
    try {
        const foundUser = await user.findOne({email: data.email});
        if(foundUser){
            return res.json({msg: "User already registered"});
        }

        const newUser = new user(data);
        const userData = await newUser.save();

        // if(!(config.ACCESS_TOKEN_SECRET && config.REFRESH_TOKEN_SECRET)){
        //     return res.json({error: "Access token secret not set"})
        // }

        const accessSecret = getAcessTokenSecret();
        const refreshSecret = getRefreshTokenSecret();

        const payload = {
            id: userData.id,
        }
        
        // const accessToken = generateAcessToken(payload);
        const accessToken = jwt.sign(payload, accessSecret)
        const refreshToken = jwt.sign(payload, refreshSecret)
        return res.json({accessToken: accessToken, refreshToken: refreshToken});
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}


export const refresh = () => {

}
import user from "../models/user";
import jwt from "jsonwebtoken";
import { config } from "../config/appConfig";
import { Request, Response } from "express";


export const register = async (req: Request, res: Response):Promise<Response> => {
    try {
        const data = req.body;
        const foundUser = await user.findOne({email: data.email});
        if(foundUser){
            return res.json({msg: "User already registered"});
        }

        const newUser = new user(data)
        const userData = await newUser.save()
        const payload = {
            id: userData.id,
            email: userData.email,
        }
        if(!config.ACCESS_TOKEN_SECRET){
            return res.json({error: "access token secret not set"})
        }

        const accessToken = jwt.sign(payload,config.ACCESS_TOKEN_SECRET)
        return res.json({accessToken: accessToken});
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}


export const refresh = () => {

}
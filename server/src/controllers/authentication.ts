import User, { IUser } from "../models/user";
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "../middleware/auth";
import { JwtPayload } from "jsonwebtoken";
import {success,error} from "../utils/response"
import { CustomError } from "../middleware/error";

export const register = async (req: Request, res: Response, next: NextFunction):Promise<Response|void> => {
    try {        
        const data = req.body;

        const foundUser = await User.findOne<IUser>({email: data.email});
        if(foundUser){
            const err:CustomError = new Error('User already registered');
            err.status = 409;
            return next(err);
        }

        const newUser = new User(data);
        const userData: IUser = await newUser.save();
        
        // return res.status(201).json({msg: "User created"});
        return res.status(201).json(success(201, {message: "Registration Successful"}));
    } 
    catch (err) {
        next(err)
    }
}

export const login = async (req: Request, res:Response, next:NextFunction):Promise<Response|void> => {
    try{
        const{email,password} = req.body;

        const user = await User.findOne<IUser>({ email });
        if (!user || !(await user.comparePassword(password))){
            const err:CustomError = new Error('Incorrect email or password')
            err.status = 400;
            return next(err);
        }

        const payload:JwtPayload={
            id: user.id.toString(),
            email: email,
        };

        const accessToken:string = generateAccessToken(payload);
        
        // return res.status(200).json({token: accessToken});
        return res.status(200).json(success(200, { token: accessToken ,message:"Login Successful"}));
    } 
    catch (error) {
        next(error);
    }

}
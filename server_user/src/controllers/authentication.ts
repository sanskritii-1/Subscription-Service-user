import User, { IUser } from "../models/user";
import { NextFunction, Request, Response } from "express";
import { registerValidationSchema, loginValidationSchema } from "../validations/schemas";
import { generateAccessToken } from "../middleware/auth";
import { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../middleware/error";


export const register = async (req: Request, res: Response, next: NextFunction):Promise<Response|void> => {
    try {
        // joi validation
        // const {error} = registerValidationSchema.validate(req.body);
        
        // if(error){
        //     const err:CustomError = new Error(error.details[0].message);
        //     err.status = 400;
        //     throw err;
        // }
        
        const data = req.body;

        // saving user data in user table if it doesn't exist
        const foundUser = await User.findOne<IUser>({email: data.email});
        if(foundUser){
            // const err:CustomError = new Error("User already registered");
            // err.status = 409;
            // throw err;
            return next({status: 409, message: "User already registered"})
        }

        const newUser = new User(data);
        const userData: IUser = await newUser.save();

        return res.status(201).json({msg: "User created"});
    } 
    catch (err) {
        next(err)
    }
}


export const login = async (req: Request, res:Response, next:NextFunction):Promise<Response|void> => {
    try{
        // joi validation
        const {error} = loginValidationSchema.validate(req.body);
        if (error) {
            // const err:CustomError = new Error(error.details[0].message);
            // err.status = 400;
            // throw err;
            return next({status: 400, message: error.details[0].message})
        }

        const{email,password} = req.body;

        // checking if user exists
        const user = await User.findOne<IUser>({ email });
        if (!user || !(await user.comparePassword(password))){
            // const err:CustomError = new Error("Incorrect email or password");
            // err.status = 400;
            // throw err;
            return next({status: 400, message: "Incorrect email or password"})
        }

        // generating token
        const payload:JwtPayload={
            id: user.id.toString(),
        };

        const accessToken:string = generateAccessToken(payload);
        
        return res.status(200).json({token: accessToken});
    } 
    catch (error) {
        next(error);
    }

}
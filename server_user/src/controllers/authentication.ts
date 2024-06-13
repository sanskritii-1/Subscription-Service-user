import User from "../models/user";
import { Request, Response } from "express";
import { registerValidationSchema, loginValidationSchema } from "../validations/userValidation";
import { generateAccessToken } from "../middleware/auth";
import { JwtPayload } from "jsonwebtoken";


export const register = async (req: Request, res: Response):Promise<Response> => {
    try {
        // joi validation
        const {error} = registerValidationSchema.validate(req.body);
        
        if(error){
            return res.status(400).json({error: error.details[0].message});
        }
        
        const data = req.body;

        // saving user data in user table if it doesn't exist
        const foundUser = await User.findOne({email: data.email});
        if(foundUser){
            return res.status(409).json({msg: "User already registered"});
        }

        const newUser = new User(data);
        const userData = await newUser.save();


        // generating access token
        const payload:JwtPayload = {
            id: userData.id,
        }
        
        const accessToken = generateAccessToken(payload);

        return res.status(200).json({token: accessToken});
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}


export const login = async (req: Request, res:Response):Promise<Response> => {
    try{
        // joi validation
        const {error} = loginValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const{email,password} = req.body;

        // checking if user exists
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // generating token
        const payload:JwtPayload={
            id: user.id.toString(),
        };

        const accessToken:string = generateAccessToken(payload);
        
        return res.status(200).json({token: accessToken});
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }

}
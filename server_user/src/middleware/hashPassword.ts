import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

export const hashPassword = async (req:Request, res:Response, next: NextFunction):Promise<void> => {
    try {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;
        }

        next();
    } 
    catch (err) {
        console.log(err);
        next(err);
    }
}
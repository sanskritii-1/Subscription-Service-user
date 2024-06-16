import { Request, Response } from "express";
import Plan from "../models/Plan";

export const allPlans = async (req: Request, res: Response):Promise<Response> => {
    try {
        const data = await Plan.find();
        if(data.length == 0) return res.status(404).json({error: "No subscription plans found"});

        return res.status(200).json(data);
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}
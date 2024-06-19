import { NextFunction, Request, Response } from "express";
import Plan from "../models/plan";
import { CustomError } from "../middleware/error";

export const getPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const plans = await Plan.find();
      if(plans.length == 0){
        const err:CustomError = new Error("No subscription plans found");
            err.status = 500;
            throw err;
      } 
      res.status(200).json(plans);
    } 
    catch (error) {
      next(error);
    }
  };
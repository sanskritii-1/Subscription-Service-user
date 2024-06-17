import { Request, Response } from "express";
import Plan from "../models/plan";

export const getPlans = async (req: Request, res: Response) => {
    try {
      const plans = await Plan.find();
      if(plans.length == 0) return res.status(404).json({error: "No subscription plans found"});
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
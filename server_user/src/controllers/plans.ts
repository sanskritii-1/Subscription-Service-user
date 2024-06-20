import { NextFunction, Request, Response } from "express";
import Plan, { IPlan } from "../models/plan";
import { CustomError } from "../middleware/error";
import Subscription, { ISubscription } from "../models/transaction";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  id?: string | JwtPayload;
}

export const getPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plans = await Plan.find();
    if (plans.length == 0) {
      const err: CustomError = new Error("No subscription plans found");
      err.status = 500;
      throw err;
    }
    res.status(200).json(plans);
  }
  catch (error) {
    next(error);
  }
};

// Fetch current plan for a user
export const getCurrentPlan = async (req: CustomRequest, res: Response) => {
  try {
    console.log("hi", req.id);
    const userId = (req.id as JwtPayload).id as string;
    console.log(userId);
    const subscription = await Subscription.findOne({ userId }).sort({startDate:-1});

    if (!subscription) {
      return res.status(404).json({ message: 'No current plan found for the user' });
    }

    const planId = subscription.planId as unknown as string;;
    const currentPlan = await Plan.findById(planId) as IPlan;

    const purchaseDate = new Date(subscription.startDate).toLocaleDateString();
    // Calculate remaining days
    const currentDate = new Date();
    const remainingDuration = Math.max(0, Math.ceil((subscription.endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));

    const currentPlanDetails = {
      planName: currentPlan.name,
      duration: currentPlan.duration,
      purchaseDate: purchaseDate,
      remainingDuration
    };

    return res.status(200).json(currentPlanDetails);
  } catch (error) {
    //console.error('Error fetching plan details:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

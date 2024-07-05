import { NextFunction, Request, Response } from "express";
import Plan, { IPlan } from "../models/plan";
import Subscription, { ISubscription } from "../models/subscription";
import { JwtPayload } from "jsonwebtoken";
import UserResource, { IUserResources } from "../models/userResource";
import { allPlans } from "../data/plans";
import {success,error} from "../utils/response"
import mongoose from "mongoose";
import { CustomRequest } from "../middleware/auth";
import { CustomError } from "../middleware/error";

export const getPlans = async (req: Request, res: Response, next: NextFunction):Promise<Response|void> => {
  try {
    // await Plan.insertMany(allPlans);
    const plans = await Plan.find();
    if (plans.length == 0) {
      const err:CustomError = new Error('No subscription plans found');
      err.status = 500;
      return next(err);
    }

    return res.status(200).json(success(200, {plans}));
  }
  catch (error) {
    next(error);
  }
};


export const getCurrentPlan = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response|void> => {
  try {
    // console.log("hi", req.id);
    const userId = (req.id as JwtPayload).id as string;
    // console.log(userId);
    const subscription = await Subscription.findOne({ userId }).sort({startDate:-1});

    if (!subscription) {
      const err:CustomError = new Error('Subscribe to a plan');
      err.status = 404;
      return next(err);
    }

    const planId = subscription.planId as unknown as string;;
    const currentPlan = await Plan.findById(planId) as IPlan;
    // const userResource = await UserResource.findOne<IUserResources>({userId: userId})
    const remainingResources = await UserResource.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$leftResources' },
      {
          $lookup: {
              from: 'resources',
              localField: 'leftResources.rId',
              foreignField: '_id',
              as: 'resourceDetails'
          }
      },
      { $unwind: '$resourceDetails' },
      {
          $project: {
              title: '$resourceDetails.title',
              access: '$leftResources.access'
          }
      }
  ]);

    const purchaseDate = new Date(subscription.startDate).toLocaleDateString();
    const currentDate = new Date();
    const remainingDuration = Math.max(0, Math.ceil((subscription.endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));

    const currentPlanDetails = {
      planName: currentPlan.name,
      duration: currentPlan.duration,
      purchaseDate: purchaseDate,
      remainingResources,
      remainingDuration
    };

    return res.status(200).json(success(200, {currentPlanDetails}));
  } 
  catch (error) {
    //console.error('Error fetching plan details:', error);
    next(error);    
  } 
};

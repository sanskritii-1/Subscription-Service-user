import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/user';
import { JwtPayload } from 'jsonwebtoken';
import Subscription, {ISubscription} from '../models/subscription';
import Plan, { IPlan } from '../models/plan';
import {success,error} from "../utils/response"
import { CustomRequest } from '../middleware/auth';

export const getPaymentHistory = async (req: CustomRequest, res: Response, next:NextFunction) => {
  const userId = <JwtPayload>req.id; // Assuming user ID is stored in req.user

  try {
    const paymentHistory = await Subscription.find<ISubscription>({ userId: userId.id });
  
    const response = [];
    for (const ele of paymentHistory){
      const plan = await Plan.findOne<IPlan>({_id: ele.planId});
      response.push({
        amount: plan?.price,
        name: plan?.name,
        date: new Date(ele.startDate).toLocaleDateString(),
      })
    }
    return res.status(200).json(success(200,{response}));
    
  } 
  catch (error) {
    next(error);
  }
};

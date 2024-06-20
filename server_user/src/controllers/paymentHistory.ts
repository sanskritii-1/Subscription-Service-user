import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/user';
import { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../middleware/error';
import Subscription, {ISubscription} from '../models/transaction';
import Plan, { IPlan } from '../models/plan';

interface CustomRequest extends Request{
  id?:string | JwtPayload;
}

export const getPaymentHistory = async (req: CustomRequest, res: Response, next:NextFunction) => {
  const userId = <JwtPayload>req.id; // Assuming user ID is stored in req.user

  try {
    const paymentHistory = await Subscription.find<ISubscription>({ userId: userId.id });
    // if(paymentHistory.length===0){
    //   const err:CustomError = new Error("No payment records found");
    //   err.status = 404;
    //   throw err;
    // } 
    const response = [];
    for (const ele of paymentHistory){
      const plan = await Plan.findOne<IPlan>({_id: ele.planId});
      response.push({
        amount: plan?.price,
        name: plan?.name,
        date: new Date(ele.startDate).toLocaleDateString(),
      })
    }
    res.status(200).json(response);
  } 
  catch (error) {
    next(error);
  }
};

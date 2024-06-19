import { NextFunction, Request, Response } from 'express';
import PaymentHistory, { IPaymentHistory } from '../models/PaymentHistory';
import { IUser } from '../models/user';
import { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../middleware/error';

interface CustomRequest extends Request{
  id?:string | JwtPayload;
}

export const getPaymentHistory = async (req: CustomRequest, res: Response, next:NextFunction) => {
  const userId = <JwtPayload>req.id; // Assuming user ID is stored in req.user

  try {
    const paymentHistory = await PaymentHistory.find({ userId: userId.id });
    if(paymentHistory.length===0){
      const err:CustomError = new Error("No payment records found");
      err.status = 404;
      throw err;
    } 
    res.status(200).json(paymentHistory);
  } 
  catch (error) {
    next(error);
  }
};

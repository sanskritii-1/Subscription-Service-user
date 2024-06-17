import { Request, Response } from 'express';
import PaymentHistory, { IPaymentHistory } from '../models/PaymentHistory';
import { IUser } from '../models/user';
import { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request{
  id?:string | JwtPayload;
}

export const getPaymentHistory = async (req: CustomRequest, res: Response) => {
  const userId = <JwtPayload>req.id; // Assuming user ID is stored in req.user

  try {
    const paymentHistory = await PaymentHistory.find({ userId: userId.id });
    if(paymentHistory.length===0) return res.status(404).json({error: "No records found"});
    res.status(200).json(paymentHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

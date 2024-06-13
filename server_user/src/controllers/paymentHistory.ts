import { Request, Response } from 'express';
import PaymentHistory, { IPaymentHistory } from '../models/PaymentHistory';
import { IUser } from '../models/user';

interface CustomRequest extends Request {
  user?: IUser;
}

export const getPaymentHistory = async (req: CustomRequest, res: Response) => {
  const userId = req.user?._id; // Assuming user ID is stored in req.user

  try {
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const paymentHistory = await PaymentHistory.find({ userId });
    res.status(200).json(paymentHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

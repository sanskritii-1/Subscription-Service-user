import { Request, Response } from 'express';
import Joi from 'joi';
import Subscription from '../models/subscription';
import Plan from '../models/plan';
import User from '../models/user';
import { JwtPayload } from 'jsonwebtoken';

const subscribeSchema = Joi.object({
    // userId: Joi.string().required(),
    planId: Joi.string().required(),
});

interface CustomRequest extends Request{
    id?:string | JwtPayload;
  }

export const subscribe = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        const { error } = subscribeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { planId } = req.body;
        const payloadData = <JwtPayload>req.id;
        const userId = payloadData.id;

        const user = await User.findById(userId);
        const plan = await Plan.findById(planId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + plan.duration);

        const newSubscription = new Subscription({
            userId: userId,
            planId: planId,
            startDate: startDate,
            endDate: endDate,
        });

        await newSubscription.save();

        return res.status(201).json({ message: 'Subscription created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

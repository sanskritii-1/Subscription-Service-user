import { Request, Response } from 'express';
import Joi from 'joi';
import Subscription from '../models/transaction';
import Plan from '../models/plan';
import User from '../models/user';
import { JwtPayload } from 'jsonwebtoken';
import UserResource from '../models/userResources';
import {success,error} from "../utils/response"

const subscribeSchema = Joi.object({
    planId: Joi.string().required(),
});

interface CustomRequest extends Request {
    id?: string | JwtPayload;
}

const addUserResource = async (userId: string, resource: number) => {
    try {
        await UserResource.findOneAndUpdate(
            {userId: userId}, 
            {$set:{leftResources: resource}}, 
            {upsert: true}
        )  
    } 
    catch (err) {
        throw err;
    }
}

export const subscribe = async (req: CustomRequest, res: Response): Promise<Response> => {
    try {
        const { error } = subscribeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { planId } = req.body;
        const payloadData = req.id as JwtPayload;
        const userId = payloadData.id;

        const user = await User.findById(userId);
        const plan = await Plan.findById(planId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!plan) {
            return res.status(404).json({ error: 'Plan not found' });
        }

        await addUserResource(userId, plan.resources);

        const startDate = new Date();
        const endDate = new Date(startDate);

        
        endDate.setMonth(endDate.getMonth() + plan.duration);

       
        endDate.setDate(Math.min(startDate.getDate(), new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()));

        const newSubscription = new Subscription({
            userId: userId,
            planId: planId,
            startDate: startDate,
            endDate: endDate,
        });

        await newSubscription.save();

        return res.status(201).json(success(201, { message: 'Subscription purchased successfully' }));
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

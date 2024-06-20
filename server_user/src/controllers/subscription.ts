import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import Subscription from '../models/transaction';
import Plan, { IPlan } from '../models/plan';
import User from '../models/user';
import { JwtPayload } from 'jsonwebtoken';
import UserResource, { IUserResources } from '../models/userResources';
import { CustomError } from '../middleware/error';

const subscribeSchema = Joi.object({
    planId: Joi.string().required(),
});

interface CustomRequest extends Request {
    id?: string | JwtPayload;
}

const addUserResource = async (userId: string, resource: number) => {
    try {
        await UserResource.findOneAndUpdate(
            { userId: userId },
            { $set: { leftResources: resource } },
            { upsert: true }
        )
    }
    catch (err) {
        throw err;
    }
}

export const subscribe = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { error } = subscribeSchema.validate(req.body);
        if (error) {
            return next({status: 400, message: error.details[0].message});

            // return res.status(400).json({ error: error.details[0].message });
        }

        const { planId } = req.body;
        const payloadData = req.id as JwtPayload;
        const userId = payloadData.id;

        const user = await User.findById(userId);
        const plan = await Plan.findById(planId);

        if (!user) {
            // const err:CustomError = new Error("User not found");
            // err.status = 404;
            return next({status: 404, message: "User not found"});
            // return res.status(404).json({ error: 'User not found' });
        }

        if (!plan) {
            // const err:CustomError = new Error("Plan not found");
            // err.status = 404;
            return next({status: 404, message: "Plan not found"});
            // throw err;
            // return res.status(404).json({ error: 'Plan not found' });
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

        return res.status(201).json({ message: 'Subscription created successfully' });
    } catch (err) {
        // console.error(err);
        // return res.status(500).json({ error: 'Internal Server Error' });
        next(err);
    }
};


export const unsubscribe = async (req: CustomRequest, res: Response, next: NextFunction):Promise<Response | void> => {
    try {
        const planId = req.body.planId;
        const leftResources = req.body.leftResources;
        const payloadData = <JwtPayload>req.id;
    
        const plan = await Plan.findOne<IPlan>({ _id: planId });
    
        // if (!plan) {
        //     const err: CustomError = new Error("Your plan is not found");
        //     err.status = 404;
        //     throw err;
        // }

        if(plan?.price === 0){
            // const err:CustomError = new Error("Cannot unsubscribe to a free plan");
            // err.status = 400;
            return next({status: 400, message: "Cannot unsubscribe to a free plan"});
        }

        const freePlan = await Plan.findOne<IPlan>({price:0});

        if(!freePlan){
            return next({status: 500, message: "No free plan found"})
        }
        
        if(leftResources > freePlan.resources){
            await UserResource.updateOne<IUserResources>({userId: payloadData.id}, {$set:{leftResources: freePlan.resources}});
        }

        return res.status(200).json({message: "Successfully unsubscribed"})
    } 
    catch (err) {
        next(err);
    }
}
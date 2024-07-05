import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Resource, { IResource } from "../models/resource";
import {images} from "../data/images";
import UserResource, { IUserResources } from "../models/userResource";
import {success,error} from "../utils/response"
import Plan from "../models/plan";
import Subscription from "../models/subscription";
import { CustomRequest } from "../middleware/auth";
import { CustomError } from "../middleware/error";

export const getResources = async (req: CustomRequest, res: Response, next: NextFunction):Promise<Response|void> => {
    try {
        // await Resource.insertMany(images);        
        // const resources = await Resource.find<IResource>({}, 'title description blur_url');
        const userId = (req.id as JwtPayload).id as string;
        const allResources = await Resource.find<IResource>({}, 'title description blur_url');
        const subscription = await Subscription.findOne({ userId }).sort({startDate:-1});
        if(!subscription || subscription.endDate < new Date()){
            return next({status:400, message: "Subscribe to a plan"})
        }

        const planId = subscription.planId;
        
        const plan = await Plan.findById(planId).populate({
            path: 'grpId',
            populate: {
                path: 'resources.rId', 
                model: 'Resource' 
            }
        }).exec();

        if (!plan){
            const err:CustomError = new Error('Plan not found');
            err.status = 500;
            return next(err);
        }

        const resourcesAccessible = (plan.grpId as any).resources.map((resource: any) => ({
            _id: resource.rId._id,
            title: resource.rId.title,
            description: resource.rId.description,
            blur_url: resource.rId.blur_url,
        }));

        const grpResourceIds = new Set((plan.grpId as any).resources.map((resource: any) => resource.rId._id.toString()));
        
        const resourcesInaccessible = allResources
            .filter((resource:any) => !grpResourceIds.has(resource._id.toString()))
            .map((resource:any) => ({
                _id: resource._id,
                title: resource.title,
                description: resource.description,
                blur_url: resource.blur_url,
            }));
        return res.status(200).json(success(200, {resourcesAccessible, resourcesInaccessible}));
    } 
    catch (err) {
        next(err);
    }

}

export const accessResource = async (req: CustomRequest, res: Response, next:NextFunction):Promise<Response|void> => {
    try {
        // console.log('payload for resource access: ', req.id);

        const userId = <JwtPayload>req.id;
        
        const foundUser = await UserResource.findOne<IUserResources>({userId: userId.id});
        // console.log("founduser in resources: ", foundUser)

        if(!foundUser){
            const err:CustomError = new Error('Transaction record not found');
            err.status = 500;
            return next(err);
        } 

        const resource = foundUser.leftResources.find(resource => resource.rId.equals(req.body.imageId));

        if(!resource){
            const err:CustomError = new Error('Subscribe to a higher tier');
            err.status = 400;
            return next(err);
        }
        
        if(resource.access === 0){
            const err:CustomError = new Error('Cannot access anymore resources');
            err.status = 403;
            return next(err);
        }
        
        if(resource.access > 0){
            await UserResource.updateOne({userId: userId.id, "leftResources.rId": req.body.imageId}, {$inc: {"leftResources.$.access":-1}});
        }
        
        const image_details = await Resource.findOne<IResource>({_id:req.body.imageId});
        
        if(!image_details){
            const err:CustomError = new Error('Resource not found');
            err.status = 404;
            return next(err);
        }

        return res.status(200).json(success(200,{url: image_details.url}));

    } 
    catch (err) {
        next(err);
    }
}
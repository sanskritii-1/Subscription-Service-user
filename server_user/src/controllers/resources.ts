import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Resource, { IResource } from "../models/resources";
import {images} from "../data/images";
import UserResource, { IUserResources } from "../models/userResources";
import {success,error} from "../utils/response"
import Plan from "../models/plan";
import Subscription from "../models/transaction";

interface CustomRequest extends Request{
    id?:string | JwtPayload;
}

export const getResources = async (req: CustomRequest, res: Response, next: NextFunction):Promise<Response|void> => {
    try {
        // await Resource.insertMany(images);        
        // const resources = await Resource.find<IResource>({}, 'title description blur_url');
        const userId = (req.id as JwtPayload).id as string;
        const allResources = await Resource.find<IResource>({}, 'title description blur_url');
        const subscription = await Subscription.findOne({ userId }).sort({startDate:-1});
        if(!subscription){
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
            return next({status:500, message: "Plan not found"})
        }

        const resourcesAccessible = (plan.grpId as any).resources.map((resource: any) => ({
            _id: resource.rId._id,
            title: resource.rId.title,
            description: resource.rId.description,
            blur_url: resource.rId.blur_url,
            // access: resource.access
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
            return next({status: 500, message: "Transaction record not found. Subscribe to a plan"})
        } 

        const resource = foundUser.leftResources.find(resource => resource.rId.equals(req.body.imageId));

        if(!resource){
            return next({status: 400, message: "Subscribe to a higher tier"})
        }

        if(resource.access === 0){
            return next({status: 403, message: "Cannot access anymore resources"})
        }

        if(resource.access > 0){
            await UserResource.updateOne({userId: userId.id, "leftResources.rId": req.body.imageId}, {$inc: {"leftResources.$.access":-1}});
        }

        const image_details = await Resource.findOne<IResource>({_id:req.body.imageId});

        if(!image_details){
            return next({status:404, message: "Resource not found"})
        }

        return res.status(200).json(success(200,{url: image_details.url}));

    } 
    catch (err) {
        next(err);
    }
}
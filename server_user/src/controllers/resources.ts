import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Resource, { IResource } from "../models/resources";
import {images} from "../data/images";
import UserResource, { IUserResources } from "../models/userResources";

interface CustomRequest extends Request{
    id?:string | JwtPayload;
}

export const getResources = async (req: CustomRequest, res: Response):Promise<Response> => {
    try {
        // await Resource.insertMany(images);
        if(!req.id) return res.status(401).json({error: "Unauthorised access to resources: Token not found"});
        
        const resources = await Resource.find<IResource>();
        return res.status(200).json(resources);
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }

}

export const accessResource = async (req: CustomRequest, res: Response):Promise<Response> => {
    try {
        console.log('payload for resource access: ', req.id);
        if(!req.id){
            return res.status(401).json({error: "Unauthorised access to resources: Token not found"});
        }

        const userId = <JwtPayload>req.id;
        
        const foundUser = await UserResource.findOne<IUserResources>({userId: userId.id});
        console.log("founduser in resources: ", foundUser)

        if(!foundUser) return res.status(500).json({error: "User resource record not found"});

        if(foundUser.leftResources === 0){
            return res.status(403).json({error: "Cannot access anymore resources"});
        }

        await UserResource.updateOne({userId: userId.id}, {$inc: {leftResources:-1}});
        return res.status(200).json({msg: "Successfully accessed resource"});
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}
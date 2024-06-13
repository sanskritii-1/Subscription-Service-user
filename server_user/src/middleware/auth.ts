import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getAcessTokenSecret } from "../utils";
import User, { IUser } from "../models/user";

interface CustomRequest extends Request {
    user?: IUser;
}

// Authorization middleware
export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const accessSecret = getAcessTokenSecret();
        const decoded = jwt.verify(token, accessSecret) as JwtPayload;
        
        // Fetch user from database using user ID from token payload
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Set user on the request object
        req.user = user;

        next();
    } catch (err) {
        console.error(err);
        if (err instanceof jwt.JsonWebTokenError) {
            res.status(403).json({ error: "Invalid token" });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
};

// Admin middleware
export const adminMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(403).json({ error: "Forbidden" });
        }

        // Check if user is an admin
        if (user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ error: "Forbidden" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Function to generate access token
export const generateAccessToken = (payload: JwtPayload): string => {
    try {
        const accessSecret = getAcessTokenSecret();
        return jwt.sign(payload, accessSecret, { expiresIn: '15d' });
    } catch (err) {
        console.error(err);
        throw err;
    }
};

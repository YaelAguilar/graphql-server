import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req: Request & { verifiedUser?: any }, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.verifiedUser = verified.user;
        next();
    } catch (error) {
        console.error("Error verifying JWT:", error);
        next();
    }
}

export default { authenticate };

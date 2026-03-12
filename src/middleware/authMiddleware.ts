import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = async (res: Request, req: Response, next: NextFunction) => {
    const token = res.header('Authorization')?.split(' ')[1];

    if (!token) return req.status(401).json({ error: "Access denied." })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        res.user = decoded;
        next();
        
    } catch (error) {
        req.status(401).json({ error: "Invalid token." })
    }
};
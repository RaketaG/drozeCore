import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header('Authorization')?.split(' ')[1];

    if (!accessToken) return res.status(401).json({ error: "Access denied." });

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
        req.user = decoded as JwtPayload;
        next();

    } catch (error) {
        res.status(401).json({ error: "Invalid accessToken." });
    }
};
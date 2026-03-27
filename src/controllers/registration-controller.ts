import type { Request, Response } from 'express';
import { addUser } from "../services/user-services.js";

export const registrationController = async (
    req: Request, res: Response
) => {
    try {
        const responseObject = await addUser(req.body);
        res.json(responseObject);

    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};
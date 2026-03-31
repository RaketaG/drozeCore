import type { Request, Response } from 'express';
import { addVenue } from "../services/venue-services.js";

export const addVenueController = async (
    req: Request, res: Response
) => {
    const { userId, userRole } = req.user;
    try {
        const responseObject = await addVenue({ ...req.body, userId });
        res.json(responseObject);

    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};
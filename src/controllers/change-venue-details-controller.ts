import type { Request, Response } from 'express';
import { addVenue, changeVenueDetails } from "../services/venue-services.js";

export const changeVenueDetailsController = async (
    req: Request, res: Response
) => {
    const { userId } = req.user;
    const { id, name, address, email, phone } = req.body;
    try {
        const responseObject = await changeVenueDetails(
            id, userId, name, address, email, phone
        );
        res.json(responseObject);

    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};
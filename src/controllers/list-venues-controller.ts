import type { Request, Response } from 'express';
import { listVenues } from "../services/venue-services.js";

export const listVenuesController = async (
    req: Request, res: Response
) => {
    const { userId } = req.user;
    try {
        const venueList = await listVenues(userId);
        res.json(venueList);

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
import type { Request, Response } from 'express';
import { Venue } from "../entities/venue.js";

export const venueDetailsController = async (
    req: Request, res: Response
) => {
    const { userId } = req.user;
    const id = req.query.id as string;
    try {
        if (!id) throw  new Error("Venue id is not present");
        const venueList = await Venue.venueDetails(userId, id);
        res.json(venueList);

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
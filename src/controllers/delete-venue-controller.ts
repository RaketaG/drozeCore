import type { Request, Response } from 'express';
import { deleteVenue } from "../services/venue-services.js";

export const deleteVenueController = async (
    req: Request, res: Response
) => {
    const { id } = req.params as { id: string };
    try {
        const responseObject = await deleteVenue(id);
        res.json(responseObject);

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
import { Venue } from "../entities/venue.js";
import { deleteFromVenues, insertIntoVenues, selectFromVenues } from "../repository/venues-repository.js";

type VenueType = {
    id: string;
    userId: string;
    name: string;
    address: string;
    email: string;
    phone: string;
}

export const addVenue = async (
    { userId, name, address, email, phone }: VenueType
) => {
    const newVenue = new Venue({ userId, name, address, email, phone });
    try {
        await insertIntoVenues(newVenue);
        return {
            id: newVenue.id,
            username: newVenue.name
        };

    } catch (error) {
        throw error;
    }
};

export const deleteVenue = async (
    id: string
) => {
    try {
        await deleteFromVenues(id);
        return {
            id
        };

    } catch (error) {
        throw error;
    }
};

export const listVenues = async (
    userId: string
) => {
    try {
        const listObject = await selectFromVenues(userId);
        return listObject.rows;

    } catch (error) {
        throw error;
    }
};

export const changeVenueDetails = async (
    id: string, userId: string,
    name?: string, address?: string,
    email?: string, phone?: string
) => {
    const prevDetails = await Venue.venueDetails(userId, id);
    const venue = new Venue(prevDetails);
    try {
        await venue.changeDetails(name, address, email, phone);
        return {
            id
        };
    } catch (error) {
        throw error;
    }
};
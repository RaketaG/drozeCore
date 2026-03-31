import { v4 as uuidv4 } from 'uuid';
import { selectSpecificFromVenues, updateIntoVenues } from "../repository/venues-repository.js";

export type VenueType = {
    id?: string;
    userId: string;
    name: string;
    address: string;
    email: string;
    phone: string;
}

export class Venue {
    id: string;
    userId: string;
    name: string;
    address: string;
    email: string;
    phone: string;

    constructor({ id, userId, name, address, email, phone }: VenueType) {
        this.id = id ?? uuidv4();
        this.userId = userId;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }

    static async venueDetails(userId: string, id: string) {
        try {
            const detailsObject = await selectSpecificFromVenues(userId, id);
            return detailsObject.rows[0];

        } catch (error) {
            throw error;
        }
    }

    async changeDetails(
        name?: string, address?: string,
        email?: string, phone?: string
    ) {
        try {
            await updateIntoVenues({
                id: this.id,
                userId: this.userId,
                name: name ?? this.name,
                address: address ?? this.address,
                email: email ?? this.email,
                phone: phone ?? this.phone
            });
            return {
                id: this.id
            };

        } catch (error) {
            throw error
        }
    }
}
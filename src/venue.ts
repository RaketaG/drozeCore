import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { pool } from './config/db.js';

export type VenueType = {
    restoratorId: string;
    name: string;
    address: string;
    email: string;
    phone: string;
}

export class Venue {
    id: string;
    restoratorId: string;
    name: string;
    address: string;
    email: string;
    phone: string;

    constructor({ restoratorId, name, address, email, phone }: VenueType) {
        this.id = uuidv4();
        this.restoratorId = restoratorId;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }

    async addVenue() {
        try {
            await pool.query(
                `INSERT INTO public.venues
                (id, restoratorId, name, address, email, phone)
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [this.id, this.restoratorId, this.name,
                this.address, this.email, this.phone]
            );

        } catch (error) {
            throw error
        }
    }

    static async isMyVenue(userId: string, venueId: string) {
        try {
            const queryResult = await pool.query(
                `SELECT restoratorId FROM public.venues
                WHERE "id" = $1 AND "restoratorid" = $2`,
                [venueId, userId]
            );

            return queryResult.rowCount === 1;

        } catch (error) {
            throw error;
        }
    }

    static async deleteVenue(id: string) {
        try {
            await pool.query(
                `DELETE FROM public.venues
                WHERE "id" = $1`,
                [id]
            );
        } catch (error) {
            throw error;
        }
    }

    static async venueDetails(id: string) {
        try {
            const queryResult = await pool.query(
                `SELECT * FROM public.venues
                WHERE "id" = $1`,
                [id]
            );
            return queryResult.rows;

        } catch (error) {
            throw error;
        }
    }

    static async venueList() {
        try {
            const queryResult = await pool.query(
                `SELECT * FROM public.venues`
            );
            return queryResult.rows;

        } catch (error) {
            throw error;
        }
    }
}
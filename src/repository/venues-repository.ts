import { pool } from "../config/db.js";

type VenueType = {
    id: string;
    userId: string;
    name: string;
    address: string;
    email: string;
    phone: string;
};

export const insertIntoVenues = async (
    { id, userId, name, address, email, phone }: VenueType
) => {
    try {
        await pool.query(
            `INSERT INTO "public"."venues"
            ("id", "userId", "name", "address", "email", "phone")
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [id, userId, name, address, email, phone]
        );

    } catch (error) {
        throw error;
    }
};

export const updateIntoVenues = async (
    { id, name, address, email, phone }: VenueType
) => {
    try {
        await pool.query(
            `UPDATE "public"."venues" SET
            "name" = $1, "address" = $2, "email" = $3, "phone" = $4
            WHERE "id" = $5`,
            [name, address, email, phone, id]
        );

    } catch (error) {
        throw error;
    }
};

export const deleteFromVenues = async (
    id: string
) => {
    try {
        await pool.query(
            `DELETE FROM "public"."venues"
            WHERE "id" = $1`,
            [id]
        );

    } catch (error) {
        throw error;
    }
};

export const selectFromVenues = async (
    userId: string
) => {
    try {
        const queryResponse = await pool.query(
            `SELECT * FROM "public"."venues"
            WHERE "userId" = $1`,
            [userId]
        );
        return queryResponse;

    } catch (error) {
        throw error;
    }
};

export const selectSpecificFromVenues = async (
    userId: string, id: string
) => {
    try {
        const queryResponse = await pool.query(
            `SELECT * FROM "public"."venues"
            WHERE "userId" = $1 and "id" = $2`,
            [userId, id]
        );
        return queryResponse;

    } catch (error) {
        throw error;
    }
};
import { pool } from "../config/db.js";

export type MenuCategoryType = {
    id: string;
    venueId: string;
    category: string;
}

export const insertIntoMenuCategories = async (
    { id, venueId, category }: MenuCategoryType
) => {
    try {
        await pool.query(
            `INSERT INTO "public"."menuCategories"
            ("id", "venueId", "category")
            VALUES ($1, $2, $3)`,
            [id, venueId, category]
        );

    } catch (error) {
        throw error;
    }
};

export const updateIntoMenuCategories = async (
    { id, venueId, category }: MenuCategoryType
) => {
    try {
        await pool.query(
            `UPDATE "public"."menuCategories" SET
            "venueId" = $1, "category" = $2
            WHERE "id" = $3`,
            [venueId, category, id]
        );

    } catch (error) {
        throw error;
    }
};

export const deleteFromMenuCategories = async (
    id: string
) => {
    try {
        await pool.query(
            `DELETE FROM "public"."menuCategories"
            WHERE "id" = $1`,
            [id]
        );

    } catch (error) {
        throw error;
    }
};

export const selectFromMenuCategories = async (
    venueId: string
) => {
    try {
        const queryResponse = await pool.query(
            `SELECT * FROM "public"."menuCategories"
            WHERE "venueId" = $1`,
            [venueId]
        );
        return queryResponse;

    } catch (error) {
        throw error;
    }
};


export const selectSpecificFromMenuCategories = async (
    id: string, venueId: string
) => {
    try {
        const queryResponse = await pool.query(
            `SELECT * FROM "public"."menuCategories"
            WHERE "venueId" = $1 and "id" = $2`,
            [venueId, id]
        );
        return queryResponse;

    } catch (error) {
        throw error;
    }
};
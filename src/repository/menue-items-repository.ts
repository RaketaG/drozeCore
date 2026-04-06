import { pool } from "../config/db.js";

export type MenuItemType = {
    id: string;
    categoryId: string;
    venueId: string;
    itemName: string;
    description?: string;
    itemPrice: number;
    isAvailable: boolean;
};

export const insertIntoMenuItems = async (
    { id, categoryId, venueId, itemName,
        description, itemPrice, isAvailable }: MenuItemType
) => {
    try {
        await pool.query(
            `INSERT INTO "public"."menuItems"
            ("id", "categoryId", "venueId", "itemName", "description", "itemPrice", "isAvailable")
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [id, categoryId, venueId, itemName, description, itemPrice, isAvailable]
        );

    } catch (error) {
        throw error;
    }
};

export const updateIntoMenuItems = async (
    { id, categoryId, itemName,
        description, itemPrice, isAvailable }: MenuItemType
) => {
    try {
        await pool.query(
            `UPDATE "public"."menuItems" SET
            "categoryId" = $1, "itemName" = $2, "description" = $3, "itemPrice" = $4, "isAvailable" = $5
            WHERE "id" = $6`,
            [categoryId, itemName, description, itemPrice, isAvailable, id]
        );

    } catch (error) {
        throw error;
    }
};

export const deleteFromMenuItems = async (
    id: string
) => {
    try {
        await pool.query(
            `DELETE FROM "public"."menuItems"
            WHERE "id" = $1`,
            [id]
        );

    } catch (error) {
        throw error;
    }
};

export const selectFromMenuItems = async (
    venueId: string
) => {
    try {
        const queryResponse = await pool.query(
            `SELECT * FROM "public"."menuItems"
            WHERE "venueId" = $1`,
            [venueId]
        );
        return queryResponse;

    } catch (error) {
        throw error;
    }
};

export const selectCategoryFromMenuItems = async (
    categoryId: string
) => {
    try {
        const queryResponse = await pool.query(
            `SELECT * FROM "public"."menuItems"
            WHERE "categoryId" = $1`,
            [categoryId]
        );
        return queryResponse;

    } catch (error) {
        throw error;
    }
};


export const selectSpecificFromMenuItems = async (
    id: string
) => {
    try {
        const queryResponse = await pool.query(
            `SELECT * FROM "public"."menuItems"
            WHERE "id" = $1`,
            [id]
        );
        return queryResponse;

    } catch (error) {
        throw error;
    }
};
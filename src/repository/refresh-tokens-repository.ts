import { pool } from "../config/db.js";

export const insertIntoRefreshTokens = async (
    refreshTokenId: string, userId: string, refreshToken: string
) => {

    try {
        await pool.query(
            `INSERT INTO "public"."refreshTokens"
            ("id", "userId", "refreshToken")
            VALUES ($1, $2, $3)`,
            [refreshTokenId, userId, refreshToken]
        );

    } catch (error) {
        throw error;
    }
};

export const selectFromRefreshTokens = async (
    refreshTokenId: string
) => {

    try {
        const queryResponse = await pool.query(
            `SELECT "refreshToken" FROM "public"."refreshTokens"
            WHERE "id" = $1`,
            [refreshTokenId]
        );

        return queryResponse.rows[0].refreshToken;

    } catch (error) {
        throw error;
    }
};

export const removeFromRefreshTokens = async (
    refreshTokenId: string
) => {
    try {
        await pool.query(
            `DELETE FROM "public"."refreshTokens"
            WHERE "id" = $1`,
            [refreshTokenId]
        );
    } catch (error) {
        throw error;
    }
};
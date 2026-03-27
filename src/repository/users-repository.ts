import { pool } from '../config/db.js';

type UserType = {
    id: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    role: "admin" | "restorator" | "user";
    fullName: string;
}

export const insertIntoUsers = async (
    { id, username, email, phone, password, role, fullName }: UserType
) => {

    try {
        await pool.query(
            `INSERT INTO "public"."users"
            ("id", "username", "email", "phone", "password", "role", "fullName")
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [id, username, email, phone, password, role, fullName]
        );

    } catch (error) {
        throw error;
    }
};

export const selectFromUsers = async (
    username: string
) => {

    try {
        const queryResult = await pool.query(
            `SELECT "password", "id", "role" FROM "public"."users"
            WHERE "username" = $1`,
            [username]
        );

        if (!queryResult.rowCount) throw new Error("User not found.");

        const userPassword = queryResult.rows[0].password;
        const userId = queryResult.rows[0].id;
        const userRole = queryResult.rows[0].role;

        return {
            userPassword,
            userId,
            userRole,
        };

    } catch (error) {
        throw error;
    }
};
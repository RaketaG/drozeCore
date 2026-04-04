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
            `SELECT * FROM "public"."users"
            WHERE "username" = $1`,
            [username]
        );

        if (!queryResult.rowCount) throw new Error("User not found.");

        const userId = queryResult.rows[0].id;
        const email = queryResult.rows[0].email;
        const phone = queryResult.rows[0].phone;
        const password = queryResult.rows[0].password;
        const userRole = queryResult.rows[0].role;
        const fullName = queryResult.rows[0].fullName;

        return {
            userId,
            email,
            phone,
            password,
            userRole,
            fullName
        };

    } catch (error) {
        throw error;
    }
};
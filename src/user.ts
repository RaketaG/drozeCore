import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from './config/db.js';

export type UserType = {
    username: string;
    email: string;
    phone: string;
    password: string;
    role: "admin" | "restorator" | "user";
    fullName: string;
}

export class User {
    id: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    role: "admin" | "restorator" | "user";
    fullName: string;

    constructor({ username, email, phone, password, role, fullName }: UserType) {
        this.id = uuidv4();
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = bcrypt.hashSync(password, 10);
        this.role = role;
        this.fullName = fullName;
    }

    async addUser() {
        try {
            await pool.query(
                `INSERT INTO public.restorators
                (id, username, email, phone, password, role, fullname)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [this.id, this.username, this.email,
                this.phone, this.password, this.role, this.fullName]
            );

        } catch (error) {
            throw error;
        }
    }

    static async login(username: string, password: string) {
        try {
            const queryResult = await pool.query(
                `SELECT password, id, role FROM public.restorators
                WHERE username = $1`,
                [username]
            );

            if (!queryResult.rowCount) throw new Error("User not found.");

            const userPassword = queryResult.rows[0].password;
            const userId = queryResult.rows[0].id;
            const userRole = queryResult.rows[0].role;

            const isMatch = await bcrypt.compare(password, userPassword)
            if (!isMatch) throw new Error("User not found.");

            const token = jwt.sign(
                { userId: userId, userRole: userRole },
                process.env.JWT_SECRET!, { expiresIn: "1h" }
            );

            return token;
        } catch (error) {
            throw error;
        }
    }

}
import 'dotenv/config';
import { pool } from "./db.js";

const initializeDB = async () => {
    try {
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id" VARCHAR(36) NOT NULL PRIMARY KEY,
                "username" TEXT UNIQUE NOT NULL,
                "email" TEXT UNIQUE NOT NULL,
                "phone" TEXT UNIQUE NOT NULL,
                "password" TEXT NOT NULL,
                "role" TEXT NOT NULL,
                "fullName" TEXT
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS "refreshTokens" (
                "id" VARCHAR(36) NOT NULL PRIMARY KEY,
                "userId" VARCHAR(36) NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
                "refreshToken" TEXT UNIQUE NOT NULL
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS "venues" (
                "id" VARCHAR(36) NOT NULL PRIMARY KEY,
                "userId" VARCHAR(36) NOT NULL REFERENCES "users"("id") ON DELETE RESTRICT,
                "name" TEXT NOT NULL,
                "address" TEXT UNIQUE NOT NULL,
                "email" TEXT NOT NULL,
                "phone" TEXT NOT NULL
            )
        `);

    } catch (error) {
        console.log(`Table was not created: ${error}`);
        process.exit(1);
    }

    await pool.end();
};

initializeDB();
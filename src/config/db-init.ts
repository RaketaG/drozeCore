import { pool } from "./db.js";

const initializeDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS restorators (
                id VARCHAR(36) NOT NULL PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                fullName TEXT
            )
        `);

    } catch (error) {
        console.log(`Table was not created: ${error}`);
        process.exit(1);
    }
    
    await pool.end();
};

initializeDB();
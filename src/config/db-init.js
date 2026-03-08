import { pool } from "./db.js";

const initializeDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reservation (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            time VARCHAR(100) NOT NULL
        )
        `);
    } catch (error) {
        console.log(`Table was not created: ${error}`);
        process.exit(1);
    }
    await pool.end();
};

initializeDB();
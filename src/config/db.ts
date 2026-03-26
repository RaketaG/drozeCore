import { Pool } from 'pg';

export const pool = new Pool({
    connectionString: process.env.DB_URL
});

export const dbConnection = async () => {
    try {
        await pool.connect();
        console.log("Connected to db.");
        
    } catch (error) {
        console.log(`Connection failed: ${error}`);
        process.exit(1);
    }
};

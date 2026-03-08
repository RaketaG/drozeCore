import express from 'express';
import { pool } from './config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const app = express();

app.get("/list", async (req, res) => {
    const list = await pool.query(`SELECT * FROM public.reservation`);
    res.json(list.rows);
});

app.post("/reservation", express.json(), async (req, res) => {
    const { name, email, time } = req.body;
    const reservId = uuidv4();

    try {
        const add = await pool.query(`
            INSERT INTO public.reservation (id, name, email, time)
            VALUES ($1, $2, $3, $4)
        `, [reservId, name, email, time]);
        res.status(201).json({ id: reservId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.put("/changeDetails", express.json(), async (req, res) => {
    const { id, name, email, time } = req.body;
    try {
        const change = await pool.query(`
            UPDATE public.reservation SET
            name = $1, email = $2, time = $3
            WHERE id = $4;    
        `, [name, email, time, id]);
        res.status(201).json({ id })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(`
            DELETE FROM public.reservation
            WHERE id = $1
            `, [id]
        );

        res.status(200).json({ id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.use((req, res) => {
    res.status(500).json({ error: "Something went wrong" });
});

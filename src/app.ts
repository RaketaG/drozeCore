import express from 'express';
import { User } from './user.js';

export const app = express();

app.post("/register", express.json(), async (req, res) => {
    const newUser = new User(req.body);

    try {
        await newUser.addUser();
        res.json({
            id: newUser.id,
            username: newUser.username,
        });

    } catch (error) {
        res.json({ error })
    }
});

app.post("/login", express.json(), async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await User.login(username, password);
        res.json({ token });
        
    } catch (error) {
        res.status(404).json({ error: (error as Error).message });
    }
});

app.use((req, res) => {
    res.status(500).json({ error: "Something went wrong" });
});

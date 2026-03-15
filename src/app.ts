import express from 'express';
import { User } from './user.js';
import { auth } from './middleware/authMiddleware.js';
import { Venue } from './venue.js';

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

app.post("/addVenue", auth, express.json(), async (req, res) => {
    const { userId, userRole } = req.user;
    let newVenue;

    switch (userRole) {
        case "restorator":
            newVenue = new Venue({ ...req.body, restoratorId: userId });
            break;
        case "admin":
            newVenue = new Venue(req.body);
            break;
        default:
            return res.status(401).json({ error: "Access denied." });
    }

    try {
        await newVenue.addVenue();
        res.json({ id: newVenue.id });

    } catch (error) {
        res.json({ error })
    }
});

app.delete("/deleteVenue/:id", auth, async (req, res) => {
    const { userId, userRole } = req.user;
    const { id } = req.params as { id: string };

    try {
        switch (userRole) {
            case "restorator":
                const isMyVenue = await Venue.isMyVenue(userId, id);
                if (!isMyVenue) return res.status(401).json({ error: "Access denied." });
                await Venue.deleteVenue(id);
                res.json({ id });
                break;

            case "admin":
                await Venue.deleteVenue(id);
                res.json({ id });
                break;

            default:
                return res.status(401).json({ error: "Access denied." });
        }

    } catch (error) {
        res.status(500).json({ error })
    }
})

app.get("/venueDetails", async (req, res) => {
    const { id } = req.query as { id: string };

    try {
        const details = await Venue.venueDetails(id);
        res.json(details);

    } catch (error) {
        res.status(500).json(error);
    }
});

app.get("/venueList", async (req, res) => {
    try {
        const details = await Venue.venueList();
        res.json(details);

    } catch (error) {
        res.status(500).json(error);
    }
});

app.use((req, res) => {
    res.status(500).json({ error: "Something went wrong" });
});

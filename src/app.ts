import express from 'express';
import cookieParser from 'cookie-parser';
import { auth } from './middleware/authMiddleware.js';
import { registrationController } from "./controllers/registration-controller.js";
import { loginController } from "./controllers/login-controller.js";
import { refreshController } from "./controllers/refresh-controller.js";
import { logoutController } from "./controllers/logout-controller.js";
import { addVenueController } from "./controllers/add-venue-controller.js";
import { deleteVenueController } from "./controllers/delete-venue-controller.js";
import { listVenuesController } from "./controllers/list-venues-controller.js";
import { venueDetailsController } from "./controllers/venue-details-controller.js";
import { changeVenueDetailsController } from "./controllers/change-venue-details-controller.js";

export const app = express();

app.post("/register", express.json(), registrationController);
app.post("/login", express.json(), loginController);
app.post("/refresh", cookieParser(), refreshController);
app.post("/logout", cookieParser(), logoutController);

app.post("/addVenue", auth, express.json(), addVenueController);
app.put("/changeVenueDetails", auth, express.json(), changeVenueDetailsController);
app.delete("/deleteVenue/:id", auth, deleteVenueController);
app.get("/listVenues", auth, listVenuesController);
app.get("/venueDetails", auth, venueDetailsController);

app.use((req, res) => {
    res.status(500).json({ error: "Something went wrong" });
});

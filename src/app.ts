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

app.post("/api/register", express.json(), registrationController);
app.post("/api/login", express.json(), loginController);
app.post("/api/refresh", cookieParser(), refreshController);
app.post("/api/logout", cookieParser(), logoutController);

app.post("/api/addVenue", auth, express.json(), addVenueController);
app.put("/api/changeVenueDetails", auth, express.json(), changeVenueDetailsController);
app.delete("/api/deleteVenue/:id", auth, deleteVenueController);
app.get("/api/listVenues", auth, listVenuesController);
app.get("/api/venueDetails", auth, venueDetailsController);

app.use((req, res) => {
    res.status(500).json({ error: "Something went wrong" });
});

import 'dotenv/config';
import https from 'https';
import fs from 'node:fs';
import { app } from "./src/entities/app.js";

https.createServer({
    key: fs.readFileSync("./openssl/drozeCore.pem"),
    cert: fs.readFileSync("./openssl/drozeCore.crt"),
}, app).listen(443, () => {
    console.log("Running");
});

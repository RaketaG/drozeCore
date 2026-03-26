import 'dotenv/config';
import https from 'https';
import fs from 'node:fs';
import { app } from "./src/app.js";

https.createServer({
    key: fs.readFileSync("./openssl/laverna.pem"),
    cert: fs.readFileSync("./openssl/laverna.crt"),
}, app).listen(443, () => {
    console.log("Running");
});

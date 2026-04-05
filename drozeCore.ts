import 'dotenv/config';
import { app } from "./src/app.js";
import { scheduledTokenCleanup } from "./src/utility/refresh-token-cleanup.js";

app.listen(3000, () => {
    console.log("Running");
    scheduledTokenCleanup();
});

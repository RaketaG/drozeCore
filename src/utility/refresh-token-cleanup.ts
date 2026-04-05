import cron from 'node-cron';
import jwt from 'jsonwebtoken';
import { removeManyFromRefreshTokens, selectAllRefreshTokens } from "../repository/refresh-tokens-repository.js";

type RefreshTokensType = {
    refreshToken: string;
    id: string;
};

export const scheduledTokenCleanup = async () => {
    cron.schedule("0 0 * * *", async () => {
        const allRefreshTokens: RefreshTokensType[] = await selectAllRefreshTokens();
        const toDelete: string[] = [];

        for (let refreshToken of allRefreshTokens) {
            try {
                jwt.verify(refreshToken.refreshToken, process.env.JWT_REFRESH_SECRET!);
            } catch (error) {
                toDelete.push(refreshToken.id);
            }
        }

        try {
            await removeManyFromRefreshTokens(toDelete);
        } catch (error) {
            console.log(error);
        }
    });
};
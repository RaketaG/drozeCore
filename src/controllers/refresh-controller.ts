import type { Request, Response } from 'express';
import { refreshUser } from "../services/user-services.js";

export const refreshController = async (
    req: Request, res: Response
) => {
    const cookies = req.cookies;

    try {
        if (!cookies.refreshToken) throw new Error("Unauthorized");

        const responseObject = await refreshUser(cookies.refreshToken);

        res.cookie(
            "refreshToken",
            responseObject.refreshToken,
            {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 2 * 60 * 60 * 1000
            }
        );
        res.json({ accessToken: responseObject.accessToken });

    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};
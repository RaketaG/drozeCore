import type { Request, Response } from 'express';
import { logoutUser } from "../services/user-services.js";

export const logoutController = async (
    req: Request, res: Response
) => {
    const cookies = req.cookies;

    try {
        if (!cookies.refreshToken) throw new Error("Unauthorized");

        const responseObject = await logoutUser(cookies.refreshToken);

        res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            }
        );
        res.json({ userId: responseObject.userId });

    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
};
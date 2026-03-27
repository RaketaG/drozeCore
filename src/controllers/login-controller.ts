import type { Request, Response } from 'express';
import { loginUser } from "../services/user-services.js";

export const loginController = async (
    req: Request, res: Response
) => {
    const { username, password } = req.body;

    try {
        const responseObject = await loginUser(username, password);
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
        res.json({accessToken: responseObject.accessToken});

    } catch (error) {
        res.status(401).json({ error: (error as Error).message })
    }
};
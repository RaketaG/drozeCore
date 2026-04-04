import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { insertIntoUsers, selectFromUsers } from "../repository/users-repository.js";
import { User } from "../entities/user.js";
import { insertIntoRefreshTokens, removeFromRefreshTokens, selectFromRefreshTokens } from "../repository/refresh-tokens-repository.js";

type UserType = {
    id: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    role: "admin" | "restorator" | "user";
    fullName: string;
}

type UserPayloadType = {
    userId: string;
    username: string;
    email: string;
    phone: string;
    userRole: "admin" | "restorator" | "user";
    fullName: string;
}

export const addUser = async (
    { username, email, phone, password, role, fullName }: UserType
) => {
    const newUser = new User({ username, email, phone, password, role, fullName });
    try {
        await insertIntoUsers(newUser);
        return {
            id: newUser.id,
            username: newUser.username
        };

    } catch (error) {
        throw error;
    }
};

const tokenGenerator = async (
    userPayload: UserPayloadType
) => {
    try {
        const accessToken = jwt.sign(
            userPayload,
            process.env.JWT_ACCESS_SECRET!, { expiresIn: "1h" }
        );

        const refreshTokenId = uuidv4();

        const refreshToken = jwt.sign(
            { refreshTokenId: refreshTokenId, ...userPayload },
            process.env.JWT_REFRESH_SECRET!, { expiresIn: "24h" }
        );

        const refreshTokenHash = bcrypt.hashSync(refreshToken, 10);

        await insertIntoRefreshTokens(refreshTokenId, userPayload.userId, refreshTokenHash);

        return {
            accessToken,
            refreshToken
        };

    } catch (error) {
        throw error;
    }
};

export const loginUser = async (
    username: string, password: string
) => {
    try {
        const {
            userId,
            email,
            phone,
            password: userPassword,
            userRole,
            fullName
        } = await selectFromUsers(username);

        const isMatch = await bcrypt.compare(password, userPassword)
        if (!isMatch) throw new Error("User not found.");

        const returnObject = await tokenGenerator({
            userId, username, email, phone, userRole, fullName
        });

        return returnObject;

    } catch (error) {
        throw error;
    }
};

export const logoutUser = async (
    refreshToken: string
) => {
    try {
        const { iat, exp, refreshTokenId, ...userPayload } =
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;

        const queryResponse = await selectFromRefreshTokens(refreshTokenId);

        const isMatch = await bcrypt.compare(refreshToken, queryResponse);
        if (!isMatch) throw new Error("User not found.");

        await removeFromRefreshTokens(refreshTokenId);

        return userPayload;

    } catch (error) {
        throw error;
    }
};

export const refreshUser = async (
    refreshToken: string
) => {
    try {
        const userPayload = await logoutUser(refreshToken);
        const returnObject = await tokenGenerator(userPayload);

        return returnObject;

    } catch (error) {
        throw error;
    }
};
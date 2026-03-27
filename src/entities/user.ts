import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export type UserType = {
    username: string;
    email: string;
    phone: string;
    password: string;
    role: "admin" | "restorator" | "user";
    fullName: string;
}

export class User {
    id: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    role: "admin" | "restorator" | "user";
    fullName: string;

    constructor({ username, email, phone, password, role, fullName }: UserType) {
        this.id = uuidv4();
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = bcrypt.hashSync(password, 10);
        this.role = role;
        this.fullName = fullName;
    }
}
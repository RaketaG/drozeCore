import 'jsonwebtoken';

declare module 'jsonwebtoken' {
  interface JwtPayload {
    userId: string;
    refreshTokenId: string;
    userRole: "admin" | "restorator" | "user";
    username: string;
    email: string;
    phone: string;
    fullName: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
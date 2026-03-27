import 'jsonwebtoken';

declare module 'jsonwebtoken' {
  interface JwtPayload {
    userId: string;
    refreshTokenId: string;
    userRole: "admin" | "restorator" | "user";
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
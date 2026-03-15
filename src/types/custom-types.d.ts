import 'jsonwebtoken';

declare module 'jsonwebtoken' {
  interface JwtPayload {
    userId: string;
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
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


// Define a custom interface to extend Request
interface AuthenticatedRequest extends Request {
    user?: any; // You can specify the type of user here
}

// JWT verification middleware
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const authHeader: string | undefined = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: true, message: "Please provide JWT token!" });
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            res.status(403).json({ error: true, message: "Invalid JWT token!" });
            return;
        }
        req.user = user;
        next();
    });
}
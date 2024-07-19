import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
};

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (error) {
        throw new Error('Invalid Token.');
    }
};

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[0];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decoded = verifyToken(token);

        req.body.userId = (decoded as any).userId;
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
};

export { generateToken, verifyToken, authenticateUser };

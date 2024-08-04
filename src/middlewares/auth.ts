import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

// AccessToken 검증 미들웨어
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!accessToken) {
        return res.status(401).json({ message: 'AccessToken이 필요합니다.' });
    }

    try {
        const decodedToken = verifyAccessToken(accessToken);
        (req as any).userId = decodedToken.userId;

        next();
    } catch (error) {
        res.status(403).json({ message: '유효하지 않은 AccessToken입니다.' });
    }
};

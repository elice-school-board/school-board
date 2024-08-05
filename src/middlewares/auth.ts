import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { RoleType } from '../entities/enums/RoleType';

// AccessToken 검증 미들웨어
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!accessToken) {
        return res.status(401).json({ message: 'AccessToken이 필요합니다.' });
    }

    try {
        const decodedToken = verifyAccessToken(accessToken);
        (req as any).userId = decodedToken.userId;
        (req as any).role = decodedToken.role;

        next();
    } catch (error) {
        res.status(403).json({ message: '유효하지 않은 AccessToken입니다.' });
    }
};

// 역할 검증 미들웨어
export const checkRole = (requiredRole: RoleType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userId = (req as any).userId;
        const userRole = (req as any).role; // 로그인한 사용자의 역할

        if (!userId) {
            return res.status(401).json({ message: '로그인이 필요합니다.' });
        }

        if (userRole !== requiredRole) {
            return res.status(403).json({ message: '권한이 없습니다.' });
        }

        next();
    };
};

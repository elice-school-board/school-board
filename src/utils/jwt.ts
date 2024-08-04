import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
import { config } from 'dotenv';

// dotenv.config();
config();

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

// AccessToken 발급
export const generateAccessToken = (userId: number): string => {
    return jwt.sign({ userId }, JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

// RefreshToken 발급
export const generateRefreshToken = (userId: number): string => {
    return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// AccessToken 검증
export const verifyAccessToken = (token: string): any => {
    return jwt.verify(token, JWT_ACCESS_SECRET);
};

// RefreshToken 검증
export const verifyRefreshToken = (token: string): any => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};

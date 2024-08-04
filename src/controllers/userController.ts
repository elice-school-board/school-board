import { Request, Response } from 'express';
import { User } from '../entities/User';
import AppDataSource from '../config/ormconfig';
import bcrypt from 'bcrypt';
import { RoleType } from '../entities/enums/RoleType';
import { generateAccessToken, verifyRefreshToken } from '../utils/jwt';

export class UserController {
    // 선생님에 의한 사용자 권한 변경
    static updateRole = async (req: Request, res: Response) => {
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({ message: '로그인 해주세요.' });
        }

        const { memberId, role } = req.body;

        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId } });

            // 선생님 여부 확인
            if (user.role !== RoleType.TEACHER) {
                return res.status(400).json({ message: '변경 권한이 없습니다.' });
            }

            // 권한 유형 유효 여부 확인
            if (!Object.values(RoleType).includes(role)) {
                return res.status(400).json({ message: '권한 유형이 유효하지 않습니다.' });
            }

            // 사용자 존재 여부 확인
            const member = await userRepository.findOne({ where: { id: memberId } });
            if (!member) {
                return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }

            // 동일한 역할로 변경하는지 확인
            if (member.role === role) {
                return res.status(400).json({ message: `${member.name}님의 기존 권한과 동일합니다.` });
            }

            member.role = role;
            await userRepository.save(member);

            res.status(200).json({ message: `${member.name}님의 권한이 ${role}으로 변경되었습니다.` });
        } catch (error) {
            res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
    };

    // 회원정보 수정
    static updateUser = async (req: Request, res: Response) => {
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({ message: '로그인 해주세요.' });
        }

        const { name, password, newPassword, checkNewPassword } = req.body;

        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId } });

            // 이름 형식 검사
            const nameRegex = /^[가-힣a-zA-Z]{2,20}$/;
            if (name && !nameRegex.test(name)) {
                return res.status(400).json({ message: '이름은 2-20자 이내의 한글, 영문자만 허용됩니다.' });
            }

            //  기존 비밀번호 일치 여부 확인
            if (password) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: '기존 비밀번호가 일치하지 않습니다.' });
                }
            }

            // 새로운 비밀번호 간의 일치 여부 확인
            if (newPassword && checkNewPassword) {
                if (newPassword !== checkNewPassword) {
                    return res.status(400).json({ message: '새로운 비밀번호가 서로 일치하지 않습니다.' });
                }
            }

            // 기존 비밀번호와 새로운 비밀번호의 동일 여부 확인
            const isSameAsCurrentPassword = await bcrypt.compare(newPassword, user.password);
            if (isSameAsCurrentPassword) {
                return res.status(400).json({ message: '기존 비밀번호와 동일한 비밀번호 입니다.' });
            }

            // 회원정보 수정
            if (name) {
                user.name = name;
            }
            if (newPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedPassword;
            }

            await userRepository.save(user);

            res.json({ message: '회원정보가 수정되었습니다.' });
        } catch (error) {
            res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
    };

    // 회원탈퇴
    static deleteUser = async (req: Request, res: Response) => {
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({ message: '로그인 해주세요.' });
        }

        const { password } = req.body;

        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }

            // 비밀번호 확인
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
            }

            await userRepository.remove(user);

            res.json({ message: '회원탈퇴가 완료되었습니다.' });
        } catch (error) {
            res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
    };

    // 로그아웃
    static logout = async (req: Request, res: Response) => {
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({ message: '로그인 해주세요.' });
        }

        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }

            // 로그아웃
            user.refreshToken = null;
            await userRepository.save(user);

            res.status(200).json({ message: '로그아웃되었습니다.' });
        } catch (error) {
            res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
    };

    // RefreshToken 검증 후, AccessToken 재발급
    static refreshToken = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'RefreshToken이 필요합니다.' });
        }

        try {
            const decodedToken = verifyRefreshToken(refreshToken);
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: decodedToken.userId } });

            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({ message: '유효하지 않은 RefreshToken입니다.' });
            }

            // AccessToken 재발급
            const newAccessToken = generateAccessToken(user.id);

            res.json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(403).json({ message: '유효하지 않은 RefreshToken입니다.' });
        }
    };
}

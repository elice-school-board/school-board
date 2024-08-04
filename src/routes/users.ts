import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/update-role', authMiddleware, UserController.updateRole); // 사용자 권한 변경
router.put('/users/:id', authMiddleware, UserController.updateUser); // 회원정보 수정
router.delete('/users/:id', authMiddleware, UserController.deleteUser); // 회원 탈퇴
router.post('/logout', authMiddleware, UserController.logout); // 로그아웃

export default router;

import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/update-role', authMiddleware, UserController.updateRole); // 사용자 권한 변경
router.put('/users/:id', authMiddleware, UserController.updateUser); // 회원정보 수정
router.delete('/users/:id', authMiddleware, UserController.deleteUser); // 회원 탈퇴
router.post('/logout', authMiddleware, UserController.logout); // 로그아웃
router.get('/my-posts', authMiddleware, UserController.getMyPosts); // 내가 쓴 게시글 조회
router.get('/my-comments', authMiddleware, UserController.getMyComments); // 내가 쓴 댓글 조회
router.post('/refresh', UserController.reissueAccessToken);

export default router;

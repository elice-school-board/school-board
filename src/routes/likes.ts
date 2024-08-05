import { Router } from 'express';
import LikeController from '../controllers/likeController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
// 좋아요
router.post('/', authMiddleware, LikeController.addLike);

// 좋아요 해제
router.delete('/:id', authMiddleware, LikeController.removeLike);

export default router;

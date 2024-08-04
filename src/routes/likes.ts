import { Router } from 'express';
import LikeController from '../controllers/likeController';

const router = Router();
// 좋아요
router.post('/', LikeController.addLike);

// 좋아요 해제
router.delete('/:id', LikeController.removeLike);

export default router;

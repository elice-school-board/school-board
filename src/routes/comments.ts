import { Router } from 'express';
import { CommentController } from '../controllers/commentController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
// 댓글 생성
router.post('/posts/:postId/comments', authMiddleware, CommentController.createComment);

// 특정 게시글의 댓글 및 대댓글 조회
router.get('/posts/:postId/comments', authMiddleware, CommentController.getCommentsByPostId);

// 특정 게시글의 베스트 댓글 조회
router.get('/posts/:postId/comments/best-comment', authMiddleware, CommentController.getBestCommentByPostId);

// 댓글 수정
router.put('/comments/:id', authMiddleware, CommentController.updateComment);

// 댓글 삭제
router.delete('/comments/:id', authMiddleware, CommentController.deleteComment);

export default router;

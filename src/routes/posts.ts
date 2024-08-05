import { Router } from 'express';
import { PostController } from '../controllers/postController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
// 게시글 생성
router.post('/', authMiddleware, PostController.createPost);

// 게시글 목록 조회
router.get('/', authMiddleware, PostController.getAllPosts);

// 스포츠 게시글 목록 조회
router.get('/sports', authMiddleware, PostController.getSportsCategories);

// 게시글 상세 조회
router.get('/:id', authMiddleware, PostController.getPostById);

// 게시글 수정
router.put('/:id', authMiddleware, PostController.updatePost);

// 게시글 삭제
router.delete('/:id', authMiddleware, PostController.deletePost);

export default router;

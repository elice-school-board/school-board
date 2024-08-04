import { Router } from "express";
import { PostController } from "../controllers/postController";

const router = Router();
// 게시글 생성
router.post("/", PostController.createPost);

// 게시글 목록 조회
router.get("/", PostController.getAllPosts);

// 게시글 상세 조회
router.get("/:id", PostController.getPostById);

// 게시글 수정
router.put("/:id", PostController.updatePost);

// 게시글 삭제
router.delete("/:id", PostController.deletePost);

export default router;

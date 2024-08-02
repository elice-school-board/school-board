import { Router } from "express";
import { PostController } from "../controllers/postController";

const router = Router();

router.post("/posts", PostController.createPost);
router.get("/posts", PostController.getAllPosts);
router.get("/posts/:id", PostController.getPostById);
router.put("/posts/:id", PostController.updatePost);
router.delete("/posts/:id", PostController.deletePost);
router.post("/posts/:id/feature", PostController.featurePost); // 공지사항을 스와이프에 올리기
router.post("/posts/:id/unfeature", PostController.unfeaturePost); // 공지사항을 스와이프에서 내리기
router.get("/featured-posts", PostController.getFeaturedPosts); // 스와이프 공지사항 조회

export default router;

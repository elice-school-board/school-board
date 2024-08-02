import { Router } from "express";
import { PostController } from "../controllers/postController";

const router = Router();

router.post("/posts", PostController.createPost);
router.get("/posts", PostController.getAllPosts);
router.get("/posts/featured", PostController.getFeaturedPosts); // carousel에 표시할 featured 게시글을 가져오기
router.get("/posts/:id", PostController.getPostById);
router.put("/posts/:id", PostController.updatePost);
router.delete("/posts/:id", PostController.deletePost);
router.post("/posts/:id/feature", PostController.featurePost); // carousel에 표시할 featured 게시글 설정하기
router.post("/posts/:id/unfeature", PostController.unfeaturePost); // carousel에 표시할 featured 게시글 설정하기

export default router;

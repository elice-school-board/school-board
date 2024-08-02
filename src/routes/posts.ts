import { Router } from "express";
import { PostController } from "../controllers/postController";

const router = Router();

router.post("/posts", PostController.createPost);
router.get("/posts", PostController.getAllPosts);
router.get("/posts/:id", PostController.getPostById);
router.put("/posts/:id", PostController.updatePost);
router.delete("/posts/:id", PostController.deletePost);

export default router;

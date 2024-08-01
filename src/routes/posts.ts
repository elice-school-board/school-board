import { Router } from "express";
import { PostController } from "../controllers/postController";

const router = Router();

router.post("/", PostController.createPost);
router.get("/", PostController.getAllPosts);
router.get("/:id", PostController.getPostById);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export default router;

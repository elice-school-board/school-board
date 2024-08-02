import { Router } from "express";
import LikeController from "../controllers/likeController";

const router = Router();

router.post("/likes", LikeController.addLike);
router.delete("/likes/:id", LikeController.removeLike);

export default router;

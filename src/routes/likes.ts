import { Router } from "express";
import LikeController from "../controllers/likeController";

const router = Router();

router.post("/", LikeController.addLike);
router.delete("/:id", LikeController.removeLike);

export default router;

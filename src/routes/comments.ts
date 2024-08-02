import { Router } from "express";
import { CommentController } from "../controllers/commentController";

const router = Router();

router.post("/posts/:postId/comments", CommentController.createComment);
router.get("/posts/:postId/comments", CommentController.getAllComments);
router.get(
  "/posts/:postId/comments/best-comment",
  CommentController.getBestCommentByPostId
); // 베스트 댓글 조회하기
router.get("/posts/:postId/comments/:id", CommentController.getCommentById);
router.put("/posts/:postId/comments/:id", CommentController.updateComment);
router.delete("/posts/:postId/comments/:id", CommentController.deleteComment);

export default router;

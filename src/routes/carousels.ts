import { Router } from "express";
import { CarouselController } from "../controllers/carouselController";

const router = Router();

router.get("/carousels/featured", CarouselController.getFeaturedPosts); // carousel에 표시할 featured 게시글을 가져오기
router.post("/carousels/feature", CarouselController.featurePost); // carousel에 표시할 featured 게시글 설정하기
router.post("/carousels/unfeature", CarouselController.unfeaturePost); // carousel에 표시할 featured 게시글 설정하기

export default router;

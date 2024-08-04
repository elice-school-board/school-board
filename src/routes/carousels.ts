import { Router } from 'express';
import { CarouselController } from '../controllers/carouselController';

const router = Router();

// carousel에 표시할 featured 게시글을 가져오기
router.get('/featured', CarouselController.getFeaturedPosts);

// carousel에 표시할 featured 게시글 설정하기
router.post('/feature', CarouselController.featurePost);

// carousel에 표시할 featured 게시글 설정하기
router.post('/unfeature', CarouselController.unfeaturePost);

export default router;

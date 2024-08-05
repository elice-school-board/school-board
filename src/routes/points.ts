import { Router } from 'express';
import { PointController } from '../controllers/pointController';

const router = Router();
// 점수들 생성
router.post('/', PointController.addPoints);

// 점수판 조회
router.get('/', PointController.getAllPoints);

// 점수들 수정
router.put('/', PointController.updatePoints);

// 점수들 삭제
router.delete('/', PointController.deletePoints);

export default router;

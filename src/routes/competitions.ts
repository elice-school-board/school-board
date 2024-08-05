import { Router } from 'express';
import { CompetitionController } from '../controllers/competitionController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// 대회 정보 생성
router.post('/', authMiddleware, CompetitionController.createCompetition);

// 대회 정보 목록 조회
router.get('/', authMiddleware, CompetitionController.getCompetitionsOnScoreBoard);

// 대회 정보 상세 조회
router.get('/:id', authMiddleware, CompetitionController.getCompetitionById);

// 대회 정보 수정
router.put('/:id', authMiddleware, CompetitionController.updateCompetition);

// 대회 정보 삭제
router.delete('/:id', authMiddleware, CompetitionController.deleteCompetition);

export default router;

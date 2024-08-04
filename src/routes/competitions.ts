import { Router } from "express";
import { CompetitionController } from "../controllers/competitionController";

const router = Router();

// 대회 정보 생성
router.post("/", CompetitionController.createCompetition);

// 대회 정보 목록 조회
router.get("/", CompetitionController.getAllCompetitions);

// 대회 정보 상세 조회
router.get("/:id", CompetitionController.getCompetitionById);

// 대회 정보 수정
router.put("/:id", CompetitionController.updateCompetition);

// 대회 정보 삭제
router.delete("/:id", CompetitionController.deleteCompetition);

export default router;

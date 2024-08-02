import { Router } from "express";
import { CompetitionController } from "../controllers/competitionController";

const router = Router();

router.post("/competitions", CompetitionController.createCompetition);
router.get("/competitions", CompetitionController.getAllCompetitions);
router.get("/competitions/:id", CompetitionController.getCompetitionById);
router.put("/competitions/:id", CompetitionController.updateCompetition);
router.delete("/competitions/:id", CompetitionController.deleteCompetition);

export default router;

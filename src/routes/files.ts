import { Router } from "express";
import { FileController } from "../controllers/fileController";
import { upload } from "../middlewares/upload";
const router = Router();

router.post("/files", upload.array("files", 10), FileController.uploadFileToS3);

export default router;

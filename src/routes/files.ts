import { Router } from "express";
import { FileController } from "../controllers/fileController";
import { upload } from "../middlewares/upload";
const router = Router();

router.post("/files", upload.single("file"), FileController.uploadFileUrl);

export default router;

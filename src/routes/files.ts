import { Router } from "express";
import { FileController } from "../controllers/fileController";
import { upload } from "../middlewares/upload";
const router = Router();

router.post("/files", upload.array("files", 10), FileController.uploadFiles); // AWS S3에 파일 업로드. 10은 한 번 업로드할 때, 10개까지 업로드할 수 있다는 뜻

export default router;

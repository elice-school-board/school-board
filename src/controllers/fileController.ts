import { Request, Response } from "express";
import AppDataSource from "../config/ormconfig";
import { File } from "../entities/File";

export class FileController {
  static uploadFileUrl = async (req: Request, res: Response) => {
    try {
      console.log("파일컨트롤러");
      const file = req.file;
      const files = req.files;

      return res.status(201).json({ file, files });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "파일을 업로드할 수 없습니다.", error });
    }
  };
}

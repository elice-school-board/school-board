import { Request, Response } from "express";

export class FileController {
  static uploadFileToS3 = async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.MulterS3.File[];

      const fileData = files.map((file) => ({
        name: file.originalname,
        mime: file.mimetype,
        size: file.size,
        url: file.location,
      }));

      return res.status(201).json(fileData);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "파일을 업로드할 수 없습니다.", error });
    }
  };
}

import "dotenv/config";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import moment from "moment-timezone";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read-write",
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const date = new Date().toISOString().replace(/:/g, "-");
      const fileExtension = file.originalname.split(".").pop();
      const filename = `file-${date}.${fileExtension}`;
      cb(null, filename);
    },
  }),
});

export { upload };

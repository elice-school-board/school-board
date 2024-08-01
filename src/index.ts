import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 기본 페이지입니다.");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

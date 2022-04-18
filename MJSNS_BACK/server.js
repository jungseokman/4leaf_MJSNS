const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = 4000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const testRouter = require("./routers/testRouter");

app.use("/call/test", testRouter);

app.listen(PORT, () => {
  console.log(`MJSNS BACKEND :: ${PORT} SERVER !!`);
});

// DB 연결
// 프론트에서 신호를 받아 사용자 정보를 전부 터미널에 출력
// 라우터 및 디비폴더 생성 (프레임워크 사용)
// 리턴은 아무거나 해도 상관없음
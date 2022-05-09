const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const passportConfig = require("./auth/passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const PORT = 4000;
const app = express();

// public
passportConfig();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);

// develoment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
}

// production
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: ["배포URL"],
      credentials: true,
    })
  );
}

app.use(cookieParser(process.env.SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      domain: "",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const testRouter = require("./routers/testRouter");

app.use("/call/test", testRouter);

app.listen(PORT, () => {
  console.log(`MJSNS BACKEND :: ${PORT} SERVER !!`);
});

// DB 연결
// 프론트에서 신호를 받아 사용자 정보를 전부 터미널에 출력
// 라우터 및 디비폴더 생성 (프레임워크 사용)
// 리턴은 아무거나 해도 상관없음

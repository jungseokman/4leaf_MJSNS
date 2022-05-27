const express = require("express");
const db = require("../db");
const passport = require("passport");

const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    // 에러 유무
    if (error) {
      console.error(error);
      return next(error);
    }

    //인포 유무
    if (info) {
      console.log(info);
      console.log(`정상적인 로그인이 아닐 수 있습니다. ${info}`);
      return res.status(400).send("정상적인 로그인이 아닐 수 있습니다.");
    }

    /* return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
  }); */

    // 에러도 없고 이상도 없으니 -> 실제 사용자 정보를 리턴해보자
    const selectQuery = `
                SELECT  id,
                        username,
                        birth,
                        avatar,
                        darkMode
                FROM    user
                WHERE   username = "${req.body.username}"
                AND     birth = "${req.body.birth}"

                `;
    db.query(selectQuery, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(400).send("[ERROR CODE 001] 로그인이 실패했습니다.");
      }
      if (!rows[0]) {
        return res.status(400).send("[ERROR CODE 001] 로그인이 실패했습니다.");
      }
      if (rows.length === 0) {
        return res.status(400).send("[ERROR CODE 001] 로그인이 실패했습니다.");
      }
      return res.status(200).json(rows[0]);
    });
  })(req, res, next);
});

router.get("/user", (req, res, next) => {
  const query1 = `
            SELECT  username
            FROM    user
            
        `;
  try {
    db.query(query1, (err, row) => {
      if (err) {
        console.error(err);
        throw "데이터베이스 접근 에러 발생";
      }
      console.log(row);
      return res.status(200).json(row);
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("데이터 베이스 오류 발생");
  }
});

router.post("/get/one", (req, res, next) => {
  const { userId } = req.body;

  console.log(userId);

  const selectQuery = `
        SELECT  id,
                username,
                avatar,
                birth,
                msg
                
        FROM    user
        WHERE   id = ${userId}
    `;
  try {
    db.query(selectQuery, (err, row) => {
      if (err) {
        console.error(err);
        throw "사용자를 불러올 수 없습니다.";
      }

      if (row.length < 1) {
        throw "사용자 정보가 존재하지 않습니다.";
      }

      console.log(row);
      return res.status(200).json(row[0]);
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("데이터 베이스 오류 발생");
  }
});

router.post("/get/friends", (req, res, next) => {
  const { userId } = req.body;

  const selectQuery = `
        SELECT  id,
                username,
                avatar
        FROM    user
        WHERE   id  in (
            SELECT  followerId
            FROM    follow
            WHERE   followingId = ${userId}
        )
    `;
  try {
    db.query(selectQuery, (err, row) => {
      if (err) {
        console.error(err);
        throw "사용자를 불러올 수 없습니다.";
      }

      if (row.length < 1) {
        throw "사용자 정보가 존재하지 않습니다.";
      }

      console.log(row);
      return res.status(200).json(row);
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("데이터 베이스 오류 발생");
  }
});

router.post("/get/feed", (req, res, next) => {
  const { userId } = req.body;

  const selectQuery = `
    SELECT  id,
            content,
            imgURL,
            createdAt,
            userId
    FROM    feed
    WHERE   userId <> ${userId}
    AND     isDelete = 0
    ORDER BY createdAt DESC;
  `;
  try {
    db.query(selectQuery, (err, rows) => {
      if (err) {
        console.error(err);
        throw "피드값을 불러올 수 없습니다";
      }
      if (rows.length < 1) {
        throw "피드값이 존재하지 않습니다.";
      }
      console.log(rows);
      return res.status(200).json(rows);
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("피드쪽 데이터 베이스 오류 발생");
  }
});

router.post("/get/mateFeed", (req, res, next) => {
  const { userId } = req.body;

  const selectQuery = `
    SELECT  id,
            content,
            imgURL,
            createdAt,
            userId
    FROM    feed
    WHERE   userId = ${userId}
    AND     isDelete = 0
    ORDER BY createdAt DESC;
  `;
  try {
    db.query(selectQuery, (err, rows) => {
      if (err) {
        console.error(err);
        throw "피드값을 불러올 수 없습니다";
      }
      if (rows.length < 1) {
        throw "피드값이 존재하지 않습니다.";
      }
      console.log(rows);
      return res.status(200).json(rows);
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("피드쪽 데이터 베이스 오류 발생");
  }
});

module.exports = router;

const passport = require("passport");
const { Strategy: LocalStaregy } = require("passport-local");
const db = require("../db");

module.exports = () => {
  passport.use(
    //필드 입력, 콜백 함수
    new LocalStaregy(
      {
        usernameField: "username",
        passwordField: "birth",
      },
      async (username, birth, done) => {
        try {
          const selectQuery = `
                SELECT  id
                FROM    user
                WHERE   username=${username}
                AND     birth = ${birth}

                `;

          db.query(selectQuery, (err, rows) => {
            if (err) {
              throw "데이터베이스 접근에 실패했습니다.";
            }
            done(null, rows[0]);
          });
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};

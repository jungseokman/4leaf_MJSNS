const passport = require("passport");
const local = require("./local");

module.exports = () => {
  //시리얼 라이즈
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 디 시리얼라지즈
  passport.deserializeUser(async (id, done) => {
    try {
      const selectQuery = `
                SELECT  id,
                        username,
                        birth,
                        avatar,
                        darkMode
                FROM    user
                WHERE   id = ${id}

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
  });
  //로컬
  local();
};

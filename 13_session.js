const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.json());
port = 3000;
/*
   세션(session): 서버에 저장되는 사용자 상태 정보 
   쿠키(cookie):브라우저에 저장되는 작은 데이터. 세션id를 담아 서버-클라이던트가
   같은 사용자임을 인식하게 해줌

   secret: 세션 id 를 암호화할때 사용할 비밀키(문자열). 이 값이 노출되면 세션 변조 
   위험이 있음
   resave: 세션에 변화가 없어도 매 요청마다 다시 저장할지 여부
   saveUninitialized: 초기 세션을 저장할 것인지 결정
   cookie: { secure:false } 형식. https 에서만 전달할지 여부
 */
app.use(
  session({
    secret: "1234567890!@#$%^&*()",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.get("/me", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
});

app.post("/login", (req, res) => {
  const { userid, password } = req.body;
  req.session.user = { userid };
  res.send(`로그인 성공${userid}`);
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("로그아웃 되었습니다.");
  });
});

app.listen(port, () => {
  console.log(`서버 실행 중 → http://localhost:${port}`);
});

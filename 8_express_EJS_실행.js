const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.urlencoded({ extended: true })); // POST 요청용
app.use(express.static("public")); // 정적 파일 제공
// /froms 로 url 접근, 실제 물리적 경로는 public/form
app.use("/forms", express.static("public/form")); // 정적 파일 제공

// EJS 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 기본 라우팅
app.get("/", (req, res) => {
  res.send("홈페이지입니다. 다양한 기능을 테스트해보세요.");
});

// EJS 템플릿 - hello
app.get("/hello", (req, res) => {
  res.render("index", { name: "김사과" });
});

// URL 파라미터
app.get("/user/:id", (req, res) => {
  res.send(`요청한 사용자 ID는 ${req.params.id}입니다.`);
});

// 쿼리 스트링
app.get("/search", (req, res) => {
  const { keyword } = req.query;
  res.send(`검색어: ${keyword}`);
});

// POST 요청 처리
app.post("/submit", (req, res) => {
  const { name, age } = req.body;
  res.send(`이름: ${name}, 나이: ${age}`);
});

// EJS 템플릿 - posts
app.get("/posts", (req, res) => {
  const posts = [
    { title: "첫 번째 글", content: "내용입니다." },
    { title: "두 번째 글", content: "Express는 정말 편하네요!" },
  ];
  res.render("posts", { posts });
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});

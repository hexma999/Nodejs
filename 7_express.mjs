import express from "express";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader("node-msg", "Hi node.js!");
  next();
});

// 기본 라우팅
app.get("/", (req, res, next) => {
  res.send("<h2>익스프레스 서버로 만든 첫 번째 페이지</h2>");
  next();
});

app.get("/hello", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ userid: "apple", name: "김사과", age: 20 });
});

app.listen(port, () => {
  console.log(`서버 실행 중 → http://localhost:${port}`);
});

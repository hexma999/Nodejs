const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // 템플릿 파일 경로
    const filePath = path.join(__dirname, "views", "index.ejs");

    // EJS 렌더링
    ejs.renderFile(filePath, { name: "tester" }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("서버 오류");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/users") {
    const filePath = path.join(__dirname, "views", "users.ejs");
    const users = ["김사과", "반하나", "오렌지", "이메론"];

    ejs.renderFile(filePath, { users }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("렌더링 오류");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/posts") {
    const filePath = path.join(__dirname, "views", "posts.ejs");
    const posts = [
      { title: "첫 글", content: "안녕하세요" },
      { title: "두번째 글", content: "node.js 너무 신기하다" },
      { title: "세번째 글", content: "node.js 너무 어렵다" },
    ];

    ejs.renderFile(filePath, { posts }, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("렌더링 오류");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("페이지를 찾을 수 없습니다.");
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중 → http://localhost:3000");
});

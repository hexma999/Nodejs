// const http = require("http");

// const server = http.createServer((req, res) => {
//   // req: 요청 정보 (url, method, headers 등)
//   // res: 응답 처리 객체
// });

// server.listen(3000);

const http = require("http");

const server = http.createServer((req, res) => {
  //127.0.0.1:3000/about
  const url = req.url;
  if (url === "/") {
    console.log("루트로 진입");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("home");
  } else if (url === "/about") {
    console.log("about 진입");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("mypage");
  } else {
    console.log("not found");
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 not found");
  }

  console.log(url);
  //res.writeHead(200, { "Content-Type": "text/plain" });
  //res.end("Hello, World!\n");
});

server.listen(3000, () => {
  console.log("서버 실행 중 → http://localhost:3000");
});

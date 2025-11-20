import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("클라이언트 접속!");

  ws.on("message", (message) => {
    console.log("받은 메시지:", message.toString());
    ws.send(`서버가 받은 메시지:${message}`);
  });

  ws.on("close", () => {
    console.log("클라이언트 연결 종료");
  });
});

console.log("WebSocket 서버가 3000번으로 대기 중");

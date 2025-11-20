import express from "express";
import path from "path";
import { createServer } from "http";
import fs from "fs";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const users = {};

io.on("connection", (socket) => {
  // 입장 처리
  socket.on("join", ({ nickname, channel }) => {
    socket.nickname = nickname;
    socket.channel = channel;
    users[socket.id] = { nickname, channel };
    socket.join(channel);
    const msg = { user: "system", text: `${nickname}님이 입장했습니다.` };
    console.log("nickname:", nickname, "channel:", channel);

    io.to(channel).emit("message", msg);
  });

  socket.on("chat", ({ text, to }) => {
    const sender = users[socket.id];
    if (!sender) return;
    const payload = { user: sender.nickname, text };

    if (to) {
      const receiverSocket = Object.entries(users).find(
        ([id, u]) => u.nickname === to
      )?.[0];
      if (receiverSocket) {
        io.to(receiverSocket).emit("whisper", payload);
        socket.emit("whisper", payload);
      }
    } else {
      io.to(sender.channel).emit("message", payload);
      console.log("sender.channel:", sender.channel, "payload:", payload);
    }
  });
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});

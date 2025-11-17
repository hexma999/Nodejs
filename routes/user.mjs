import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  console.log("users에 존재하는 미들웨어");
  next();
});

// http://localhost:3000/users (GET)
// 회원정보 보기
router.get("/", (req, res) => {
  res.status(200).send("GET: /users 회원정보보기");
});

// http://localhost:3000/users (POST)
// 회원가입
router.post("/", (req, res) => {
  res.status(201).send("POST: /users 회원가입");
});

// http://localhost:3000/users (PUT)
// 정보수정
router.put("/:id", (req, res) => {
  res.status(201).send("PUT: /users/:id 회원정보수정");
});

// http://localhost:3000/users (DELETE)
// 회원탈퇴
router.delete("/:id", (req, res) => {
  res.status(201).send("DELETE: /users/:id 회원탈퇴");
});

export default router;

import express from "express";
const router = express.Router();
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시글 조회
 *     responses:
 *       200:
 *         description: 게시글 목록 성공 응답
 *   post:
 *     summary: 새 게시글 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 생성 성공
 */
router.use((req, res, next) => {
  console.log("post에 존재하는 미들웨어");
  next();
});
router.get("/", (req, res) => {
  res.status(200).send("GET: /posts 글 보기");
});
router.post("/", (req, res) => {
  res.status(200).send("POST: /posts 글 작성하기");
});
router.put("/:id", (req, res) => {
  res.status(201).send("PUT: /posts/:id 글 수정하기");
});
router.delete("/:id", (req, res) => {
  res.status(200).send("DELETE: /posts/:id 글 삭제하기");
});
// 라우팅
export default router;

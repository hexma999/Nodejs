import express from "express";
import userRouter from "./routes/user.mjs";
import postRouter from "./routes/post.mjs";
import swaggerUI from "swagger-ui-express";
import swaggerSepc from "./swagger.mjs";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSepc));

// http://localhost:3000/users
app.use("/users", userRouter);
// http://localhost:3000/posts
app.use("/posts", postRouter);

app.listen(3000, () => {
  console.log("서버 실행 중");
});

import swaggerJSDoc from "swagger-jsdoc";

// swagger-jsdoc 으로 스팩 객체를 만들어서 내보내는 설정 파일
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "게시판 API",
      version: "1.0.0",
      description: "게시글 관련 REST API 문서입니다.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.mjs"], // 주석으로부터 API 문서 생성
};
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;

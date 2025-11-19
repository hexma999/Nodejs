import express from "express";
import multer from "multer";
import fs from "fs";

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.static("public")); // 정적 파일 제공

/* 
   multer.diskStorage: 디스크(로컬 폴더)에 파일을 저장하는 방식을 설정하는 함수
   destination : 파일을 어느 폴더에 저장할지 설정
       req : 현재 HTTP 요청 객체
       file : 업로드된 파일 정보가 들어 있는 객체
       callback : 에러객체와 저장 경로를 콜백으로 multer 에게 알려줌

   filename : 업로드된 파일의 실제 저장 파일명을 결정
       req : 현재 HTTP 요청 객체
       file : 업로드된 파일 정보
       callback(error, filename) : 두번째 매개변수가 실제 저장된 파일
      
*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    callback(null, uploadPath); //에러는 null 로 보냄
  },
  filename: (req, file, callback) => {
    // Date.now() : 현재 시간을 밀리초 단위로 반환
    // Math.random() : 0 이상 1미만의 랜덤한 실수
    // 1e9 : 0~1,000,000,000 사이의 랜덤 숫자
    // Math.round() : 소수점 반올림
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + "-" + file.originalname); //에러는 null 로 보냄
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}); // 같은 이름이면 storage 로 생략가능 ,10M 로 파일용량 제한

// ── 단일 파일 업로드 엔드포인트 ──
// POST /upload-single
app.post("/upload-single", upload.single("file"), (req, res) => {
  // req.file 에 업로드된 파일 정보가 담겨 있습니다.
  console.log(req.file);
  res.json({
    message: "단일 파일 업로드 성공",
    file: req.file,
  });
});

// ── 여러 파일 업로드 엔드포인트 ──
// POST /upload-multiple
app.post("/upload-multiple", upload.array("files", 5), (req, res) => {
  // req.files 에 업로드된 파일 배열이 담겨 있습니다.
  console.log(req.files);
  res.json({
    message: "다중 파일 업로드 성공",
    files: req.files,
  });
});

app.listen(port, () => {
  console.log(`실행 중`);
});

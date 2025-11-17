const fs = require("fs");

//동기 방식
const data = fs.readFileSync("example.txt", "utf8");
console.log("동기방식 파일 내용:", data);

//비동기 방식
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("파일 읽기 실패:", err);
    return;
  }
  console.log("비동기방식 파일 내용:", data);
});

console.log("프로그램을 종료합니다.");

fs.writeFileSync("output.txt", "이 내용이 파일에 저장됩니다.");
console.log("파일 저장 완료 (동기)");

fs.writeFile("output.txt", "비동기 방식으로 저장합니다.", (err) => {
  if (err) {
    console.error("저장 실패:", err);
    return;
  }
  console.log("파일 저장 완료 (비동기)");
});

fs.appendFile("example.txt", "\n새로운 줄이 추가됩니다.", (err) => {
  if (err) throw err;
  console.log("내용 추가 완료");
});

fs.unlink("delete.txt", (err) => {
  if (err) throw err;
  console.log("파일 삭제 완료");
});

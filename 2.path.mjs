import path from "path";
import { fileURLToPath } from "url";

//__dirname, __filename 는 msj 에서는 기본 제공되지 않음
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname); // 현재 디렉토리
console.log(__filename); // 현재 디렉토리의 파일이름
console.log(path.sep); //디렉토리를 나누는 특수문자

console.log(path.basename(__filename)); //파일 이름만 추출
console.log(path.basename(__filename, ".mjs")); //확장자를 제외
console.log(path.dirname(__filename)); //디렉토리만 추출
console.log(path.extname(__filename)); //확장명만 추출

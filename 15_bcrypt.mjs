/*
   bcrypt: 비밀번호를 안전하게 저장하기 위해 만들어진 "느리고,공격하기 힘든"
   비밀번호 전용 해시 함수
   
   SHA256, SHA512
   - 빠르게 계산하는 것이 목표 -> 비밀번호 저장하는 "빠른 해시"가 독일 수 있음

   ! 일부러 느리게 동작하는 해시 함수 -> bcrypt, scrypt, Argon2 ..

   bcrypt의 특징
   1. 내부적으로 해시 연산을 여러 번 반복(saltRounds)
   2. Salt를 자동으로 사용 : 같은 비밀번호라도 일부러 랜덤 문자열을 섞어서 해시하게 만드는 값
*/
import bcrypt from "bcrypt";

const password = "1111"; // 사용자가 입력한 비밀번호
const saltRounds = 10; // 연산 반복 횟수 (10~12 추천)

// 1. 비밀번호 해시화 (저장할 때)
async function hashPassword(password) {
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log("해시된 비밀번호:", hashed);
  return hashed;
}

// 2. 비밀번호 검증 (로그인할 때)
async function verifyPassword(inputPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  console.log("비밀번호 일치 여부:", isMatch);
  return isMatch;
}

// 사용 예시
async function runExample() {
  const hashed = await hashPassword(password); // 비밀번호 암호화

  await verifyPassword("1111", hashed); // 비밀번호 맞음 → true
  await verifyPassword("1234", hashed); // 비밀번호 틀림 → false
}

//$2b$10$ISW.kTxcB4Modkzzy7hu7.eMvdH3lDgvoaeEgVpLGJ8jrRgO2n2fu
// $2b$ : bcrypt 버전
// 10$  : saltRounds
// ISW.kTxcB4Modkzzy7hu7.eMvdH3lDgvoaeEgVpLGJ8jrRgO2n2fu : salt + 해시 결과
runExample();

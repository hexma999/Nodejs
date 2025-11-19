/*
  JWT : JSON Web Token(JWT)은 서버와 클라이언트 사이에서 인증 정보를 안전하게 전달하기 위한 컴팩트하고 독립적인 토큰입니다.
  
  저장
  1. 세션:서버 메모리, Redis, DB -> 세션 ID 만 가진 쿠키
  2. JWT: 클라이언트(브라우저)에 문자열로 저장(localStorage, cookie 등) 
     -> 토큰 자체

  보안
  1.세션:id 가 유출되면 위험하지만, 서버쪽에서 강제로 세션 삭제.
         서버 내부에 상태를 저장하기 때문에 관리가 쉬운 편
  2.JWT: 토큰이 유출되면 exp(만료) 전까지 막기 어려움.
         데이터가 유출되더라도 비밀키를 알 수 없어서 치명적이지 않음  
         
  추천
  1.세션: 단일 서버 또는 간단한 웹 서비스. 전통적인 웹사이트(JSP, 템플릿 기반).
          로그인 상태 유지만 필요하고 외부 서비스와 토큰 공유할 일이 없는 경우          
  2.JWT: SPA, REST API 서버 구조, 모바일 앱/웹, 다른 서비스들이 같은 인증 토큰을 
         공유해야 하는 경우. 인증서버 분리 구조(Auth 서버 + 여러 API 서버)   
         
  세션 vs JWT
  - 세션은 서버가 사용자 상태를 기억하고, 클라이언트는 세션 id 만 들고 다니는 방식
  - 사용자 정보를 토큰 안에 넣어서 클라이언트에게 주고, 서버는 토큰을 검증만 하는 방식  
  
  JWT
  
  Header (헤더)
  1. HS256:대칭키 방식, 같은 키로 서명도 하고 검증도 함. 구조 단순, 속도 빠름, 설정 쉬움
  2. RS256:비대칭키 방식(private/public key 쌍).개인키로 서명. 공개키로 검증.
     키를 여러 서버스에 공개해도 됨 -> 외부 서비스 검증용 / 인증 서버 분리용    
*/
import jwt from "jsonwebtoken"; //npm install jsonwebtoken

const secretKey = "1234567890!@#$%^&*()"; // 서버 비밀키 (절대 공개 X)

// 1. 토큰 생성
const token = jwt.sign(
  { userid: "apple", role: "admin" }, // payload (토큰에 담을 데이터)
  secretKey, // 비밀키
  { expiresIn: "1h" } // 옵션: 1시간 뒤 만료
);

console.log("생성된 토큰:", token);

// 2. 토큰 검증
try {
  const decoded = jwt.verify(token, secretKey);
  console.log("검증된 토큰 내용:", decoded);
} catch (error) {
  console.error("토큰 검증 실패:", error.message);
}

const counter = require("./counter"); // counter.js 파일을 불러옴

counter.increase(); // count를 1 증가
counter.increase(); // 한 번 더 증가

console.log(counter.getCount()); // 2 출력됨

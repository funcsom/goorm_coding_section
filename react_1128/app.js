import { add, subtract } from "./math.js"; // export <- default가 아닌 경우는 스코프 (중괄호) 필요, 콤마로 가져올 수 있음
import multiply from "./math.js"; // export default <- 스코프 필요 x, 하나의 모듈 (페이지)에서 한개만 default 사용 가능
// import에서 자동완성을 쓰는데, 확장자를 꼭 붙여야 함.

// console.log(add(3, 5));
// console.log(subtract(62, 22));
// console.log(multiply(7, 7));

// ------------------------------------

// 모듈 전체 가져오기
import * as Math from "./math.js";
// 몽땅 가져와서 Math라는 객체라고 쓸게

// console.log(Math.add(1, 2));

// ------------------------------------

// 이름 변경하여 가져오기
// 원본 함수명을 유지하지만, 이름을 변경하여 사용하고 싶을 때
// 원본의 함수명을 바꾸면, 해당 원본을 참조하는 다른 파일이 영향을 받기 때문
import { add as sum } from "./math.js";

// console.log(sum(2, 3));

// ------------------------------------

// fetch
// axios
// 비동기
// 동기
// async, await

// 일반적으로 ESM은 정적이지만 동적(비동기)으로 가져오기
async function loadModule() {
  const module = await import("./math.js");
  // 몽땅 가져와서 module이라는 객체라고 쓸게
  console.log(module.add(2, 3));
} // 이걸 함수 loadModule이라고 선언

// 호출
loadModule();

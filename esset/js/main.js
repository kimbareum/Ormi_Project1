import PlanGenerator from "./api/plan_generator.js";
import ChatBot from "./api/chat_bot.js";
import { data_generator, data_chatbot } from "./data/api_data.js";
import { slide, slideLeft, slideRight } from "./utils/slide.js";

new PlanGenerator(data_generator);
new ChatBot(data_chatbot);

let startPointX = 0;
let startPointY = 0;
let endPointX = 0;
let endPointY = 0;
const $slide = document.querySelector(".slide");
const $slide_btn = document.querySelector(".slide_button");

// 버튼클릭 슬라이드
$slide_btn.addEventListener("click", () => slide());

// 마우스 드래그 슬라이드
$slide.addEventListener("mousedown", (e) => {
    startPointX = e.pageX;
    startPointY = e.pageY;
});

$slide.addEventListener("mouseup", (e) => {
    endPointX = e.pageX;
    endPointY = e.pageY;
    // 복사를 위해 세로로 200px 이상 움직이면 슬라이드 안되게 설정.
    if (Math.abs(startPointY - endPointY) >= 200) {
        return;
    }
    if (startPointX < endPointX && endPointX - startPointX >= 150) {
        slideLeft();
    } else if (startPointX > endPointX && startPointX - endPointX >= 150) {
        slideRight();
    }
});

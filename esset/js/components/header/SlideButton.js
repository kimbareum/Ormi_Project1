import img_src from "../../data/img_data.js";
import { makeImgBox } from "../common/common_box.js";

export default class SlideButton {
    constructor({ $header }) {
        // 슬라이드 전환버튼 박스 및 이미지 생성
        const slideButton = makeImgBox({
            boxTag: "aside",
            boxClass: "slide-button",
            imgSrc: img_src.slide_button,
            imgAlt: "슬라이드 전환",
        });

        $header.append(slideButton);
    }
}

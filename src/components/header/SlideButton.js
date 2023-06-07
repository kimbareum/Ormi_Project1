import IMG_SRC from "../../data/imgPaths.js";
import { makeImgBox } from "../common/commonBoxes.js";

export default class SlideButton {
    constructor({ $target }) {
        // 슬라이드 전환버튼 박스 및 이미지 생성
        const slideButton = makeImgBox({
            boxTag: "aside",
            boxClass: "slide-button",
            imgSrc: IMG_SRC.slide_button,
            imgAlt: "슬라이드 전환",
        });

        $target.append(slideButton);
    }
}

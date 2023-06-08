import IMG_SRC from "../../data/imgPaths.js";
import { makeImgBox } from "../common/commonBoxes.js";

/** 슬라이드 전환 버튼을 생성 */
export default class SlideButton {
    /** 슬라이드 전환 버튼을 생성 */
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

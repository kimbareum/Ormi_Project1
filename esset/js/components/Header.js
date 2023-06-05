import { makeImgBox } from "../utils/dom_box.js";
import SlideButton from "./header/SlideButton.js";

import img_src from "../data/img_data.js";

export default class Header {
    constructor($target) {
        const header = document.createElement("header");
        $target.append(header);

        // 페이지 제목 생성
        const h1 = makeImgBox({
            boxTag: "h1",
            imgSrc: img_src.main_logo,
            imgAlt: "여행계획 도우미",
        });
        header.append(h1);

        // 슬라이드 버튼 생성.
        this.slide_button = new SlideButton({ $header: header });
    }
}

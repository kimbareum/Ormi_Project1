import { makeImgBox } from "./common/commonBoxes.js";
import { ToggleTheme } from "./header/ToggleTheme.js";

import { IMG_SRC } from "../data/imgPaths.js";

/** Header */
export class Header {
    constructor($target, themeList) {
        const header = document.createElement("header");
        $target.append(header);

        // 페이지 제목 생성
        const h1 = makeImgBox({
            boxTag: "h1",
            imgSrc: IMG_SRC.main_logo,
            imgAlt: "여행계획 도우미",
        });
        header.append(h1);

        // 테마 변경 버튼 생성.
        this.toggleTheme = new ToggleTheme({ $target: header, themeList });

        // 슬라이드 버튼 생성.
        const slideButton = makeImgBox({
            boxTag: "aside",
            boxClass: "slide-button",
            imgSrc: IMG_SRC.slide_button,
            imgAlt: "슬라이드 전환",
        });
        header.append(slideButton);
    }
}

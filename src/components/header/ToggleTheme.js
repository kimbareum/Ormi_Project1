import { makeBox, makeImgBox } from "../common/commonBoxes.js";
import IMG_SRC from "../../data/imgPaths.js";

/** 화면의 테마를 변경합니다. */
export default class ToggleTheme {
    /** 화면의 테마를 변경합니다. */
    constructor({ $target, themeList }) {
        // 로컬스토리지에 저장된 테마가 있는가 ?
        // 없다면 윈도우에 설정된 선호하는 테마가 light 인가 dark 인가?
        // 초기값 세팅
        this.currentTheme = localStorage.getItem("Theme")
            ? localStorage.getItem("Theme")
            : window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
        // body에 테마를 추가
        localStorage.setItem("Theme", this.currentTheme);
        this.body = document.querySelector("body");
        this.body.setAttribute("theme", this.currentTheme);

        // 테마 선택 버튼 박스
        this.box = makeBox({
            boxTag: "aside",
            boxClass: "toggle-theme",
        });
        $target.append(this.box);

        this.themeList = makeBox({
            boxTag: "ul",
            boxClass: "theme-list",
        });
        this.box.append(this.themeList);
        // 버튼의 이미지를 한번에 바꾸기 위해서 버튼이미지 HTML 요소를 저장할 Object.
        this.themeButtonImg = {};
        // 테마 선택 버튼을 만들고 theme 변경 이벤트를 할당.
        for (const theme of themeList) {
            const themeButton = makeImgBox({
                boxTag: "li",
                boxClass: theme,
                imgSrc: IMG_SRC[`${theme}Theme_${this.currentTheme}_icon`],
                imgAlt: theme,
            });
            themeButton.addEventListener("click", () => {
                // theme를 이 타이밍에 할당해서, 고정값으로 만듬.
                this.currentTheme = theme;
                localStorage.setItem("Theme", theme);
                this.render();
            });
            this.themeList.append(themeButton);
            this.themeButtonImg[theme] = themeButton.querySelector("img");
        }
    }
    // 테마 변경.
    render() {
        this.body.setAttribute("theme", this.currentTheme);
        for (const theme in this.themeButtonImg) {
            this.themeButtonImg[theme].src =
                IMG_SRC[`${theme}Theme_${this.currentTheme}_icon`];
        }
    }
}

import { makeBox } from "../common/commonBoxes.js";
import { IMG_SRC } from "../../data/imgPaths.js";
import { Button } from "../common/Button.js";

/** 화면의 테마를 변경하는 버튼과 기능을 제공한다. */
export class ToggleTheme {
    /** 화면의 테마를 변경하는 버튼과 기능을 제공한다. */
    constructor({ $target, themeList }) {
        // 로컬스토리지에 저장된 테마가 있는가 ?
        // 없다면 윈도우에 설정된 선호하는 테마가 light 인가 dark 인가?
        // 초기값을 세팅한다.
        this.currentTheme = localStorage.getItem("Theme")
            ? localStorage.getItem("Theme")
            : window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "dark";
        // body에 테마를 추가한다.
        localStorage.setItem("Theme", this.currentTheme);
        this.body = document.querySelector("body");
        this.body.setAttribute("theme", this.currentTheme);

        // 테마 선택 버튼 박스를 생성한다.
        this.box = makeBox({
            boxTag: "aside",
            boxClass: "toggle-theme",
        });
        $target.append(this.box);

        this.themeList = makeBox({
            boxTag: "div",
            boxClass: "theme-list",
        });
        this.box.append(this.themeList);

        // 버튼의 이미지를 한번에 바꾸기 위해서 버튼이미지 HTML 요소를 저장할 Object를 생성한다.
        this.themeButtonImg = {};

        // 테마 선택 버튼을 만들고 theme 변경 이벤트를 할당한다.
        for (const theme of themeList) {
            // 테마 선택 버튼의 이미지 HTML을 생성한다.
            const buttonImgSrc =
                IMG_SRC[`${theme}Theme_${this.currentTheme}_icon`];
            const buttonImg = `<img src="${buttonImgSrc}" alt="${theme}">`;
            // 테마 선택 버튼 생성한다.
            const themeButton = new Button({
                $target: this.themeList,
                type: "button",
                className: theme,
                HTML: buttonImg,
                option: {
                    view: `${this.currentTheme === "light" ? "dark" : "light"}`,
                },
            });

            // 테마 선택 버튼에 테마 번경 이벤트를 할당한다.
            themeButton.setEvent({
                eventType: "click",
                event: () => {
                    // 테마 변경 이벤트
                    this.currentTheme = theme;
                    localStorage.setItem("Theme", theme);
                    this.render();
                },
            });
            // 테마 선택 버튼의 이미지를 변경하기 위해서 HTML element 저장한다.
            this.themeButtonImg[theme] =
                this.themeList.lastElementChild.querySelector("img");
        }
    }
    render() {
        // 테마를 변경한다.
        this.body.setAttribute("theme", this.currentTheme);
        for (const theme in this.themeButtonImg) {
            this.themeButtonImg[theme].src =
                IMG_SRC[`${theme}Theme_${this.currentTheme}_icon`];
        }
        // 모바일 화면에서 버튼을 슬라이딩하는 요소를 조정한다.
        this.themeList.childNodes.forEach((btn) =>
            btn.setAttribute(
                "view",
                this.currentTheme === "light" ? "dark" : "light"
            )
        );
    }
}

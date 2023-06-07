import { makeBox, makeTextBox } from "./common_boxes.js";

/** 로딩스크린 modal을 생성하고, 표시와 숨김 메서드를 제공한다. */
export default class LoadingScreen {
    constructor({ $target, text }) {
        // 로딩스크린 박스 생성.
        this.loading = makeBox({
            boxTag: "div",
            boxClass: ["loading-screen", "hide"],
        });
        $target.append(this.loading);

        this.setDescription(text);
    }

    /**
     * 로딩스크린의 innerText를 변경한다.
     * @param {string} text 변경할 innerText
     */
    setDescription(text) {
        const loadingDescription = `<div>${text}</div>`;
        const loadingBox = `<div class="loading-bar"><span></span><span></span><span></span></div>`;
        this.loading.innerHTML = loadingDescription + loadingBox;
    }
    /** 로딩스크린을 표시한다. */
    show = () => {
        this.loading.classList.remove("hide");
    };
    /** 로딩스크린을 숨긴다. */
    hide = () => {
        this.loading.classList.add("hide");
    };
}

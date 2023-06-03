import { slide } from "../../utils/slide.js";

export default class SlideButton {
    constructor($header) {
        const $slide_button = document.createElement("slide-button");
        const $button = document.createElement("img");
        $button.src = "./esset/img/exchange.png";
        $button.alt = "슬라이드 전환";
        this.setEvent($button);

        $slide_button.append($button);

        $header.append($slide_button);
    }

    setEvent($button) {
        $button.addEventListener("click", (e) => {
            slide();
        });
    }
}

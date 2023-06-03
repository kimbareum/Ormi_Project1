import SlideButton from "./header/SlideButton.js";

export default class Header {
    constructor($target) {
        const $header = document.createElement("header");
        const $h1 = document.createElement("h1");
        const $logo = document.createElement("img");
        $logo.src = "./esset/img/logo.png";
        $logo.alt = "여행계획 도우미";

        $h1.append($logo);
        $header.append($h1);

        this.$slide_button = new SlideButton($header);

        $target.append($header);
    }
}

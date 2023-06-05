import img_src from "../../data/img_data.js";

export default class SlideButton {
    constructor({ $header }) {
        const slide_button = document.createElement("aside");
        slide_button.className = "slide-button";
        const button = document.createElement("img");
        button.src = img_src.slide_button;
        button.alt = "슬라이드 전환";

        slide_button.append(button);

        $header.append(slide_button);
    }
}

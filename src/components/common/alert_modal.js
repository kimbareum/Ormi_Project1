import { makeBox } from "./common_box.js";
import Button from "./button.js";

export default class AlertModal {
    constructor({ $target, text = "" }) {
        this.alertScreen = makeBox({
            boxTag: "div",
            boxClass: "alert-screen",
        });
        $target.append(this.alertScreen);

        this.alertBox = makeBox({
            boxTag: "div",
            boxClass: "alert-box",
        });
        this.alertScreen.append(this.alertBox);

        this.alertDescription = makeBox({
            boxTag: "p",
            boxClass: "alert-description",
        });
        this.alertBox.append(this.alertDescription);

        this.alertButton = new Button({
            $target: this.alertBox,
            type: "button",
            className: "alert-button",
            text: "확인",
        });

        if (text) {
            this.setDescription(text);
        }

        this.setEvent();
    }

    setEvent() {
        // 박스 외부나 버튼 클릭시 모달 닫기
        this.alertScreen.addEventListener("click", (e) => {
            if (
                e.target !== this.alertBox &&
                e.target !== this.alertDescription
            ) {
                this.hide();
            }
        });
    }

    setDescription(text) {
        this.alertDescription.innerText = text;
    }

    show = () => {
        this.alertScreen.classList.add("show");
    };

    hide = () => {
        this.alertScreen.classList.remove("show");
    };
}

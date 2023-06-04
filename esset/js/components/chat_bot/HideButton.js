import img_src from "../../data/img_data.js";

export default class HideButton {
    constructor({ $chat_bot, $window }) {
        this.hide_button = document.createElement("button");
        this.hide_button.className = "chat-hide";

        const button_img = document.createElement("img");
        button_img.src = img_src.chat_hide_icon;
        button_img.alt = "챗봇 토글";

        this.hide_button.append(button_img);
        $chat_bot.append(this.hide_button);

        this.setEvent($window);
    }

    // 챗봇 토글 이벤트.
    setEvent($window) {
        this.hide_button.addEventListener("click", () => {
            this.hide_button.classList.remove("notice");
            if ($window.classList.contains("hide")) {
                $window.classList.remove("hide");
                this.hide_button.innerText = "숨기기";
                this.hide_button.classList.add("open");
                this.toggleNotice(false);
                document.querySelector("#question").focus();
            } else {
                $window.classList.add("hide");
                this.hide_button.innerHTML = `<img src=${img_src.chat_hide_icon} alt="챗봇 토글" />`;
                this.hide_button.classList.remove("open");
            }
        });
    }

    // 챗봇 답변 알림
    toggleNotice(isNotice) {
        if (isNotice) {
            this.hide_button.classList.add("notice");
        } else {
            this.hide_button.classList.remove("notice");
        }
    }
}

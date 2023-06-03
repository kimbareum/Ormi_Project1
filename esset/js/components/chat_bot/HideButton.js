export default class HideButton {
    constructor({ $chat_bot, $window }) {
        this.hide_button = document.createElement("button");
        this.hide_button.className = "chat-hide";
        const button_img = document.createElement("img");
        button_img.src = "./esset/img/chatbot_icon.png";
        $chat_bot.append(this.hide_button);

        this.hide_button.append(button_img);
        this.setEvent(this.hide_button, $window);
    }

    setEvent(hide_button, $window) {
        hide_button.addEventListener("click", () => {
            hide_button.classList.remove("notice");
            if ($window.classList.contains("hide")) {
                $window.classList.remove("hide");
                hide_button.innerText = "숨기기";
                hide_button.classList.add("open");
                this.toggleWait(false);
                document.querySelector(".question").focus();
            } else {
                $window.classList.add("hide");
                hide_button.innerHTML = `<img src="./esset/img/chatbot_icon.png" alt="챗봇 이미지" />`;
                hide_button.classList.remove("open");
            }
        });
    }

    toggleWait(isWait) {
        if (isWait) {
            this.hide_button.classList.add("notice");
        } else {
            this.hide_button.classList.remove("notice");
        }
    }
}

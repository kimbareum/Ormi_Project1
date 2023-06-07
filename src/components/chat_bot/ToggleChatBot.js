import img_src from "../../data/img_data.js";
import Button from "../common/button.js";

export default class ToggleChatBot {
    constructor({ $chatBot, $window }) {
        // 버튼 생성.
        this.toggleButton = new Button({
            $target: $chatBot,
            type: "button",
            className: "toggle-chat",
            text: "",
        });
        // 버튼의 이미지 설정.
        this.button_img = img_src.chat_hide_icon;
        this.toggleButton.button.innerHTML = `<img src="${this.button_img}" alt="챗봇 토글">`;

        this.$window = $window;
        this.setEvent();
    }

    setEvent() {
        // 버튼에 챗봇 토글 이벤트 할당.
        this.toggleButton.setEvent({
            eventType: "click",
            event: this.toggleChatBot,
        });
    }

    toggleChatBot = () => {
        // 답변알림기능 제거
        this.toggleNotice(false);
        if (this.$window.classList.contains("hide")) {
            // 챗봇이 숨겨져있을 때
            // 숨김해제
            this.$window.classList.remove("hide");
            // 버튼 모양 변경
            this.toggleButton.button.innerText = "숨기기";
            this.toggleButton.button.classList.add("open");
            // 입력창에 포커스
            document.querySelector("#question").focus();
        } else {
            // 챗봇이 오픈되어있을 때.
            // 숨김
            this.$window.classList.add("hide");
            // 버튼 모양 변경.
            this.toggleButton.button.innerHTML = `<img src=${this.button_img} alt="챗봇 토글" />`;
            this.toggleButton.button.classList.remove("open");
        }
    };

    // 챗봇 답변 알림
    toggleNotice(isNotice) {
        if (isNotice) {
            this.toggleButton.button.classList.add("notice");
        } else {
            this.toggleButton.button.classList.remove("notice");
        }
    }
}

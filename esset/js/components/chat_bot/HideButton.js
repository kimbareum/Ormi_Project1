import img_src from "../../data/img_data.js";
import Button from "../common/button.js";
import { makeImgBox } from "../../utils/dom_box.js";

export default class HideButton {
    constructor({ $chat_bot, $window }) {
        // 버튼 생성.
        this.hide_button = new Button({
            $target: $chat_bot,
            type: "button",
            className: "chat-hide",
            text: "",
        });
        // 버튼의 이미지 설정.
        this.button_img = img_src.chat_hide_icon;
        this.hide_button.button.innerHTML = `<img src="${this.button_img}" alt="챗봇 토글">`;

        this.$window = $window;
        this.setEvent();
    }

    setEvent() {
        // 버튼에 챗봇 토글 이벤트 할당.
        this.hide_button.setEvent({
            eventType: "chatbot_hide",
            event: this.toggleChatBot,
        });
    }

    // 화살표함수라서 this가 바뀌지 않음.
    toggleChatBot = () => {
        if (this.$window.classList.contains("hide")) {
            // 챗봇이 숨겨져있을 때
            // 숨김해제
            this.$window.classList.remove("hide");
            // 버튼 모양 변경
            this.hide_button.button.innerText = "숨기기";
            this.hide_button.button.classList.add("open");
            // 답변알림기능 제거
            this.toggleNotice(false);
            // 입력창에 포커스
            document.querySelector("#question").focus();
        } else {
            // 챗봇이 오픈되어있을 때.
            // 숨김
            this.$window.classList.add("hide");
            // 버튼 모양 변경.
            this.hide_button.button.innerHTML = `<img src=${this.button_img} alt="챗봇 토글" />`;
            this.hide_button.button.classList.remove("open");
        }
    };

    // 챗봇 답변 알림
    toggleNotice(isNotice) {
        if (isNotice) {
            this.hide_button.button.classList.add("notice");
        } else {
            this.hide_button.button.classList.remove("notice");
        }
    }
}

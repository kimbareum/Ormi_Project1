import IMG_SRC from "../../data/imgPaths.js";
import Button from "../common/Button.js";

/** 챗봇의 토글액션을 담당한다. */
export default class ToggleChatBot {
    /** 챗봇의 토글액션을 담당한다. */
    constructor({ $target, $eventTarget }) {
        // 버튼 생성.
        this.button_img = IMG_SRC.chat_hide_icon;
        this.toggleButtonHTML = `<img src="${this.button_img}" alt="챗봇 토글">`;

        this.toggleButton = new Button({
            $target: $target,
            type: "button",
            className: "toggle-chat",
            HTML: this.toggleButtonHTML,
        });
        // 버튼의 이미지 설정.

        this.$eventTarget = $eventTarget;
        this.setEvent();
    }

    setEvent() {
        // 버튼에 챗봇 토글 이벤트를 할당
        this.toggleButton.setEvent({
            eventType: "click",
            event: this.toggleChatBot,
        });
    }

    /** 챗봇을 토글하는 역할을 담당한다.
     * 추가적으로 챗봇이 토글될 때, api응답에 대한 알림기능을 해제한다.
     */
    toggleChatBot = () => {
        // api응답 알림 제거
        this.toggleNotice(false);
        if (this.$eventTarget.classList.contains("hide")) {
            // 챗봇이 숨겨져있을 때
            // 숨김해제
            this.$eventTarget.classList.remove("hide");
            // 버튼 모양 변경
            this.toggleButton.button.innerText = "숨기기";
            this.toggleButton.button.classList.add("open");
            // 입력창에 포커스
            document.querySelector("#question").focus();
        } else {
            // 챗봇이 오픈되어있을 때.
            // 숨김
            this.$eventTarget.classList.add("hide");
            // 버튼 모양 변경.
            this.toggleButton.button.innerHTML = `<img src=${this.button_img} alt="챗봇 토글" />`;
            this.toggleButton.button.classList.remove("open");
        }
    };

    /** api응답이 왔음을 사용자에게 시각적으로 보여준다.
     * @param {boolean} isNotice : api응답여부
     */
    toggleNotice(isNotice) {
        if (isNotice) {
            this.toggleButton.button.classList.add("notice");
        } else {
            this.toggleButton.button.classList.remove("notice");
        }
    }
}

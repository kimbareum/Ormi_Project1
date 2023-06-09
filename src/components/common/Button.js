/** 버튼을 만들고, 이벤트지정 메서드를 제공한다. */
export default class Button {
    /**
     * 버튼을 만들고, 이벤트지정 메서드를 제공한다.
     * @param {Object} detail
     * @param {HTMLElement} detail.$target 버튼을 append할 타겟.
     * @param {string} detail.type 버튼의 타입.
     * @param {string} detail.className 버튼의 클래스.
     * @param {Object} detail.HTML 버튼의 내부에 들어갈 HTML.
     * @param {Object} detail.option 추가적인 버튼의 attribute.
     */
    constructor({ $target, type, className, HTML, option = {} }) {
        this.button = document.createElement("button");
        this.button.setAttribute("type", type);
        this.button.className = className;
        this.button.innerHTML = HTML;

        // 옵션값이 있다면 속성을 동적으로 할당.
        for (const key in option) {
            this.button.setAttribute(key, option[key]);
        }

        // target을 인자로 받았다면 target에 append
        $target.append(this.button);
    }

    /**
     * 버튼에 EventListener를 추가
     * @param {object} eventInfo
     * @param {string} eventInfo.eventType 이벤트의 타입(ex: "click", "keyDown"..)
     * @param {function} eventInfo.event 실행할 이벤트.
     */
    setEvent({ eventType, event }) {
        this.button.addEventListener(eventType, (e) => event(e));
    }
}

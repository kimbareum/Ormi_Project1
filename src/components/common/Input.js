/** 입력폼(input|textarea)을 만들고, 값반환, 값초기화, 포커스, 이벤트지정 메서드를 제공한다. */
export default class Input {
    /**
     * 입력폼(input|textarea)을 만들고, 값반환, 값초기화, 포커스, 이벤트지정 메서드를 제공한다.
     * @param {Object} detail
     * @param {HTMLElement} detail.$target input을 append 할 타겟.
     * @param {string} detail.type 입력폼의 타입.
     * @param {string} detail.id 입력폼의 id와 name.
     * @param {Object} detail.option 추가적인 입력폼의 attribute.
     */
    constructor({ $target = null, type, id, option = {} }) {
        // input 또는 textarea를 생성
        if (type === "textarea") {
            this.input = document.createElement("textarea");
        } else {
            this.input = document.createElement("input");
            this.input.type = type;
        }
        // attribute 설정
        this.input.id = id;
        this.input.name = id;

        // 옵션값이 있다면 속성을 동적으로 할당.
        for (const key in option) {
            this.input.setAttribute(key, option[key]);
        }
        // target에 append
        $target.append(this.input);
    }
    /** 현재 입력되어있는 값을 반환한다. */
    getValue = () => {
        return this.input.value;
    };

    /** 현재 입력되어 있는 값을 없앤다. */
    resetValue = () => {
        this.input.value = null;
    };

    /** 이 입력폼에 포커스한다. */
    focus = () => {
        this.input.focus();
    };

    /**
     * 입력폼에 EventListener를 추가한다.
     * @param {object} eventInfo
     * @param {string} eventInfo.eventType 이벤트의 타입(ex: "click", "keyDown"..)
     * @param {function} eventInfo.event 실행할 이벤트.
     */
    setEvent({ eventType, event }) {
        this.input.addEventListener(eventType, (e) => event(e));
    }
}

// 입력폼을 만드는 class
export default class Input {
    constructor({ $target = "", type, id, option = {} }) {
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
        // target을 인자로 받았다면 target에 append
        if ($target) {
            $target.append(this.input);
        }
    }
    // 값을 상위컴포넌트로 전달
    getValue = () => {
        return this.input.value;
    };
    // 입력값을 초기화
    resetValue = () => {
        this.input.value = null;
    };
    // 텍스트입력폼에 이벤트 추가.
    setEvent({ eventType, event }) {
        if (eventType === "enter") {
            // Enter key 입력 이벤트.
            this.input.addEventListener("keydown", (e) => {
                if (e.shiftKey && e.key == "Enter") {
                    return;
                } else if (e.key == "Enter") {
                    e.preventDefault();
                    event();
                }
            });
        }
    }
}

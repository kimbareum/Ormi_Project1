// 버튼을 만들어주는 클래스
export default class Button {
    constructor({ $target = null, type, className, text }) {
        this.button = document.createElement("button");
        this.button.setAttribute("type", type);
        this.button.className = className;
        this.button.innerText = text;

        if ($target) {
            $target.append(this.button);
        }
    }

    setEvent({ eventType, event }) {
        this.button.addEventListener(eventType, (e) => event(e));
    }
}

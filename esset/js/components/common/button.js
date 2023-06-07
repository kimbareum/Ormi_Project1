// 버튼을 만들어주는 클래스
export default class Button {
    constructor({ $target, type, className, text }) {
        this.button = document.createElement("button");
        this.button.setAttribute("type", type);
        this.button.className = className;
        this.button.innerText = text;
        $target.append(this.button);
    }

    setEvent({ eventType, event }) {
        this.button.addEventListener(eventType, (e) => event(e));
    }
}

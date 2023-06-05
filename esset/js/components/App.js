import Header from "./Header.js";
import ChatBot from "./ChatBot.js";
import Slide from "./Slide.js";

export default class App {
    constructor($target) {
        this.$target = $target;
        this.render($target);
    }

    render($target) {
        $target.innerHTML = "";
        this.header = new Header($target);

        this.slide = new Slide($target);

        this.chatbot = new ChatBot($target);
    }
}

import Header from "./Header.js";
import ChatBot from "./ChatBot.js";
import { data_chatbot } from "../data/api_data.js";

export default class App {
    constructor($target) {
        this.$target = $target;
        this.render($target);
    }

    render($target) {
        $target.innerHTML = "";
        this.header = new Header($target);

        this.chatbot = new ChatBot($target);
        // this.chat_bot = new ChatBot($target, data);
    }
}

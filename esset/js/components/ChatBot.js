import ChatScreen from "./chat_bot/ChatScreen.js";
import HideButton from "./chat_bot/HideButton.js";
import ChatForm from "./chat_bot/ChatForm.js";
import ChatApi from "./chat_bot/ChatApi.js";

export default class ChatBot {
    constructor($target) {
        this.state = {
            busy: false,
        };

        const chat_bot = document.createElement("aside");
        chat_bot.className = "chat-bot";
        const window = document.createElement("div");
        window.classList.add("chat-window", "hide");
        chat_bot.append(window);

        this.chatScreen = new ChatScreen({ $window: window });

        this.chatForm = new ChatForm({
            $window: window,
            getState: this.getState,
        });

        this.hideButton = new HideButton({
            $chat_bot: chat_bot,
            $window: window,
        });

        this.chatApi = new ChatApi({ getState: this.getState });

        $target.append(chat_bot);
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        this.chatScreen.setState(this.state);
        if (this.state.busy) {
            this.chatApi.getAnswer();
        } else {
            // 챗봇 알림 on
            this.hideButton.toggleNotice(true);
            // 챗봇 form 입력 가능하게 설정
            this.chatForm.setState({ busy: false });
        }
    }

    // 하위 컴포넌트에서 state 받아오기
    getState = (newState) => {
        this.setState(newState);
    };
}

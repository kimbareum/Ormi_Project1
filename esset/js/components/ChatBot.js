import ChatScreen from "./chat_bot/ChatScreen.js";
import ToggleChatBot from "./chat_bot/ToggleChatBot.js";
import ChatForm from "./chat_bot/ChatForm.js";
import ChatApi from "./chat_bot/ChatApi.js";

import { makeBox } from "../utils/dom_box.js";
export default class ChatBot {
    constructor($target) {
        this.state = { busy: false };

        // chat_bot 컨테이너 생성.
        const chatBot = makeBox({
            boxTag: "aside",
            boxClass: "chat-bot",
        });
        // 챗봇 메인window 생성.
        const window = makeBox({
            boxTag: "div",
            boxClass: ["chat-window", "hide"],
        });
        chatBot.append(window);

        // 챗봇의 렌더링을 담당하는 컴포넌트 생성
        this.chatScreen = new ChatScreen({ $window: window });

        // 챗봇의 입력을 담당하는 컴포넌트 생성
        this.chatForm = new ChatForm({
            $window: window,
            getState: this.getState,
        });

        // 챗봇의 표기, 비표기를 토글하는 컴포넌트 생성.
        this.toggleChatBot = new ToggleChatBot({
            $chatBot: chatBot,
            $window: window,
        });

        // 챗봇의 API 응답을 담당하는 컴포넌트 생성.
        this.chatApi = new ChatApi({ getState: this.getState });

        $target.append(chatBot);
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        // chatScreen에 랜더링 지시
        this.chatScreen.setState(this.state);

        // 상태가 busy 하다면(form 에서 입력이 들어온 상황) api 요청.
        if (this.state.busy) {
            this.chatApi.getAnswer();
        } else {
            //상태가 busy하지 않다면(api 응답이 끝난 상황)
            // 챗봇 알림 on
            this.toggleChatBot.toggleNotice(true);
            // 챗봇 form 입력 가능하게 설정
            this.chatForm.setState({ busy: false });
        }
    }

    // 하위 컴포넌트에서 state 받아오기
    getState = (newState) => {
        this.setState(newState);
    };
}

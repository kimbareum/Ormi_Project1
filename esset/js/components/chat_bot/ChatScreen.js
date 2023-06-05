import img_src from "../../data/img_data.js";
import { chatbot_data as data } from "../../data/api_data.js";

export default class ChatScreen {
    constructor({ $window }) {
        this.state = { busy: false };

        this.chat_screen = document.createElement("div");
        this.chat_screen.className = "chat-screen";
        $window.append(this.chat_screen);

        const ai_chat = document.createElement("ai-chat");
        const ai_icon = document.createElement("img");
        ai_icon.src = img_src.ai_chat_icon;
        ai_icon.alt = "AI icon";
        const chat_content = document.createElement("chat-content");
        chat_content.innerText = "반갑습니다. 어떤 것이 궁금하신가요?";

        this.chat_screen.append(ai_chat);
        ai_chat.append(ai_icon, chat_content);
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        if (this.state.busy) {
            // 상태가 busy 일때 : 챗스크린에 user-chat(질문) 렌더링 후, 로딩창 표시
            this.renderQuestion(data[data.length - 1].content);
            this.showLoading();
        } else {
            // 상태가 busy가 아닐때 : 로딩창을 제거한 후, 챗스크린에 ai-chat(답변) 렌더링
            this.chat_screen.removeChild(this.chat_screen.lastChild);
            if (data[data.length - 1].role === "assistant") {
                this.renderAnswer(data[data.length - 1].content);
            }
        }
        this.scrollTop();
    }

    // 답변이 생성되었거나
    scrollTop() {
        this.chat_screen.scrollTop = this.chat_screen.scrollHeight;
    }

    showLoading() {
        const ai_chat = document.createElement("ai-chat");
        const loading_box = document.createElement("loading-bar");
        const loading_item1 = document.createElement("span");
        const loading_item2 = document.createElement("span");
        const loading_item3 = document.createElement("span");
        ai_chat.append(loading_box);
        loading_box.append(loading_item1, loading_item2, loading_item3);
        this.chat_screen.append(ai_chat);
    }

    renderQuestion(question) {
        const user_chat = document.createElement("user-chat");
        const user_chat_content = document.createElement("chat-content");
        user_chat_content.innerText = question;
        user_chat.append(user_chat_content);
        this.chat_screen.append(user_chat);
    }

    renderAnswer(answer) {
        if (answer) {
            const ai_chat = document.createElement("ai-chat");
            ai_chat.innerHTML = `<img src="${img_src.ai_chat_icon}" alt="AI icon" />`;
            const ai_chat_content = document.createElement("chat-content");
            ai_chat_content.innerText = answer;
            ai_chat.append(ai_chat_content);
            this.chat_screen.append(ai_chat);
        }
    }
}

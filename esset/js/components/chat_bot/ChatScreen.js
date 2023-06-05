import img_src from "../../data/img_data.js";
import { chatbot_data as data } from "../../data/api_data.js";
import { makeBox, makeTextBox, makeImgBox } from "../../utils/dom_box.js";

export default class ChatScreen {
    constructor({ $window }) {
        this.state = { busy: false };

        // chat_screen 박스 생성
        this.chat_screen = makeBox({ boxTag: "div", boxClass: "chat-screen" });
        $window.append(this.chat_screen);

        /* chat_screen 초기값 */
        // ai-chat 박스를 만들고 AI 아이콘 삽입
        const ai_chat = makeImgBox({
            boxTag: "ai-chat",
            imgSrc: img_src.ai_chat_icon,
            imgAlt: "AI icon",
        });
        // ai-chat 박스에 chat-content 박스를 만들어서 추가
        const ai_chat_content = makeTextBox({
            boxTag: "chat-content",
            text: "반갑습니다. 어떤 것이 궁금하신가요?",
        });
        ai_chat.append(ai_chat_content);

        this.chat_screen.append(ai_chat);
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        if (this.state.busy) {
            // 상태가 busy 일때(api 응답을 대기중일때) : 챗스크린에 user-chat(질문) 렌더링 후, 로딩창 표시
            this.renderQuestion(data[data.length - 1].content);
            this.showLoading();
        } else {
            // 상태가 busy가 아닐때(api응답이 끝났을때) : 로딩표현을 제거한 후, 챗스크린에 ai-chat(답변) 렌더링
            this.chat_screen.removeChild(this.chat_screen.lastChild);
            if (data[data.length - 1].role === "assistant") {
                this.renderAnswer(data[data.length - 1].content);
            }
        }
        this.scrollTop();
    }

    // 챗스크린이 업데이트될때 스크롤을 맨위로 이동.
    scrollTop() {
        this.chat_screen.scrollTop = this.chat_screen.scrollHeight;
    }

    // ai-chat의 위치에 로딩창을 렌더링.
    showLoading() {
        const ai_chat = makeBox({ boxTag: "ai-chat" });
        const loading_box = `<loading-bar><span></span><span></span><span></span></loading-bar>`;
        ai_chat.innerHTML = loading_box;

        this.chat_screen.append(ai_chat);
    }

    // 질문을 화면에 렌더링.
    renderQuestion(question) {
        const user_chat = makeBox({ boxTag: "user-chat" });
        const user_chat_content = makeTextBox({
            boxTag: "chat-content",
            text: question,
        });
        user_chat.append(user_chat_content);

        this.chat_screen.append(user_chat);
    }

    // 답변을 화면에 렌더링
    renderAnswer(answer) {
        const ai_chat = makeImgBox({
            boxTag: "ai-chat",
            imgSrc: img_src.ai_chat_icon,
            imgAlt: "AI icon",
        });
        const ai_chat_content = makeTextBox({
            boxTag: "chat-content",
            text: answer,
        });
        ai_chat.append(ai_chat_content);

        this.chat_screen.append(ai_chat);
    }
}

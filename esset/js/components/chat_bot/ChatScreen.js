import img_src from "../../data/img_data.js";
import { chatbotData as data } from "../../data/api_data.js";
import { makeBox, makeTextBox, makeImgBox } from "../common/dom_box.js";

export default class ChatScreen {
    constructor({ $window }) {
        this.state = { busy: false };

        // chatScreen 박스 생성
        this.chatScreen = makeBox({ boxTag: "div", boxClass: "chat-screen" });
        $window.append(this.chatScreen);

        /* chatScreen 초기값 */
        // ai-chat 박스를 만들고 AI 아이콘 삽입
        const aiChat = makeImgBox({
            boxTag: "ai-chat",
            imgSrc: img_src.ai_chat_icon,
            imgAlt: "AI icon",
        });
        // ai-chat 박스에 chat-content 박스를 만들어서 추가
        const aiChatContent = makeTextBox({
            boxTag: "chat-content",
            text: "반갑습니다. 어떤 것이 궁금하신가요?",
        });
        aiChat.append(aiChatContent);

        this.chatScreen.append(aiChat);
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
            this.chatScreen.removeChild(this.chatScreen.lastChild);
            if (data[data.length - 1].role === "assistant") {
                this.renderAnswer(data[data.length - 1].content);
            }
        }
        this.scrollTop();
    }

    // 챗스크린이 업데이트될때 스크롤을 맨위로 이동.
    scrollTop() {
        this.chatScreen.scrollTop = this.chatScreen.scrollHeight;
    }

    // ai-chat의 위치에 로딩창을 렌더링.
    showLoading() {
        const aiChat = makeBox({ boxTag: "ai-chat" });
        const loadingBox = `<loading-bar><span></span><span></span><span></span></loading-bar>`;
        aiChat.innerHTML = loadingBox;

        this.chatScreen.append(aiChat);
    }

    // 질문을 화면에 렌더링.
    renderQuestion(question) {
        const userChat = makeBox({ boxTag: "user-chat" });
        const userChatBontent = makeTextBox({
            boxTag: "chat-content",
            text: question,
        });
        userChat.append(userChatBontent);

        this.chatScreen.append(userChat);
    }

    // 답변을 화면에 렌더링
    renderAnswer(answer) {
        const aiChat = makeImgBox({
            boxTag: "ai-chat",
            imgSrc: img_src.ai_chat_icon,
            imgAlt: "AI icon",
        });
        const aiChatContent = makeTextBox({
            boxTag: "chat-content",
            text: answer,
        });
        aiChat.append(aiChatContent);

        this.chatScreen.append(aiChat);
    }
}

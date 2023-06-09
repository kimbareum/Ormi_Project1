import IMG_SRC from "../../data/imgPaths.js";
import { chatbotData as data } from "../../data/apiData.js";
import { makeBox, makeTextBox, makeImgBox } from "../common/commonBoxes.js";
import AlertModal from "../common/AlertModal.js";

/** 챗봇 화면의 렌더링을 담당한다. */
export default class ChatScreen {
    /** 챗봇 화면의 렌더링을 담당한다. */
    constructor({ $target }) {
        this.state = { busy: false };

        // chatScreen 박스 생성
        this.chatScreen = makeBox({ boxTag: "div", boxClass: "chat-screen" });
        $target.append(this.chatScreen);

        /* chatScreen 초기값 */
        // ai-chat 박스를 만들고 AI 아이콘 삽입
        const aiChat = makeImgBox({
            boxTag: "div",
            boxClass: "ai-chat",
            imgSrc: IMG_SRC.ai_chat_icon,
            imgAlt: "AI icon",
        });
        // ai-chat 박스에 chat-content 박스를 만들어서 추가
        const aiChatContent = makeTextBox({
            boxTag: "div",
            boxClass: "chat-content",
            text: "반갑습니다. 어떤 것이 궁금하신가요?",
        });
        aiChat.append(aiChatContent);

        this.chatScreen.append(aiChat);

        this.alertModal = new AlertModal({
            $target: $target,
            text: "실수했어요. (´；д；). 다시 물어봐주세요.",
        });
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
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
            } else {
                this.alertModal.show();
            }
        }
        this.scrollTop();
    }

    /** 챗스크린이 업데이트될때 스크롤을 맨위로 이동한다. */
    scrollTop() {
        this.chatScreen.scrollTop = this.chatScreen.scrollHeight;
    }

    /** ai-chat의 위치에 로딩바를 렌더링한다 */
    showLoading() {
        const aiChat = makeBox({ boxTag: "div", boxClass: "ai-chat" });
        const loadingBox = `<div class="loading-bar"><span></span><span></span><span></span></div>`;
        aiChat.innerHTML = loadingBox;

        this.chatScreen.append(aiChat);
    }

    /** user-chat(질문)을 화면에 렌더링한다. */
    renderQuestion(question) {
        const userChat = makeBox({ boxTag: "div", boxClass: "user-chat" });
        const userChatBontent = makeTextBox({
            boxTag: "div",
            boxClass: "chat-content",
            text: question,
        });
        userChat.append(userChatBontent);

        this.chatScreen.append(userChat);
    }

    /** ai-chat(답변)을 화면에 렌더링한다. */
    renderAnswer(answer) {
        const aiChat = makeImgBox({
            boxTag: "div",
            boxClass: "ai-chat",
            imgSrc: IMG_SRC.ai_chat_icon,
            imgAlt: "AI icon",
        });
        const aiChatContent = makeTextBox({
            boxTag: "div",
            boxClass: "chat-content",
            text: answer,
        });
        aiChat.append(aiChatContent);

        this.chatScreen.append(aiChat);
    }
}

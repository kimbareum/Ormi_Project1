import { chatbot_data as data } from "../../data/api_data.js";
import { saveQuestion } from "../../utils/data_record.js";
import Button from "../common/button.js";
import Input from "../common/Input.js";

export default class ChatForm {
    constructor({ $window, getState }) {
        this.state = { busy: false };
        // 챗봇용 form 박스 생성
        this.chat_form = document.createElement("form");
        this.chat_form.setAttribute("action", "post");
        this.chat_form.className = "chat-form";
        $window.append(this.chat_form);
        // 질문을 받는 input 생성.
        this.question = new Input({
            $target: this.chat_form,
            type: "textarea",
            id: "question",
        });

        // 질문을 답변할 button 생성.
        this.button = new Button({
            $target: this.chat_form,
            type: "submit",
            className: "chat-button",
            text: "질문하기",
        });

        // ChatBot으로 state 전달
        this.sendState = getState;

        this.setEvent();
    }

    setState(newState) {
        this.state = newState;
    }

    setEvent() {
        // form 에 submit 이벤트 추가
        this.chat_form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleQuestion();
        });

        // input에 Enter key 입력 이벤트 추가.
        this.question.setEvent({
            eventType: "enter",
            event: this.handleQuestion,
        });
    }

    // form 데이터 처리.
    handleQuestion = () => {
        const question = this.question.getValue();
        // 입력값이 없거나 답변을 대기중인 상태면 중단.
        if (question && !this.state.busy) {
            // input의 입력값 초기화
            this.question.resetValue();
            // data에 질문을 저장.
            saveQuestion(data, question);
            // 챗봇에 busy state(챗봇api의 응답을 요청해야함) 전달.
            this.sendState({
                busy: true,
            });
            // 자신의 state를 busy로 만들어서 추가적인 질문 입력을 차단.
            this.setState({ busy: true });
        }
    };
}

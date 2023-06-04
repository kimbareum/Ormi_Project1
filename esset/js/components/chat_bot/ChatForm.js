import { data_chatbot as data } from "../../data/api_data.js";
import { saveQuestion } from "../../utils/data_record.js";

export default class ChatForm {
    constructor({ $window, getState }) {
        this.state = { busy: false };

        this.chat_form = document.createElement("form");
        this.chat_form.setAttribute("action", "post");
        this.chat_form.className = "chat-form";
        $window.append(this.chat_form);

        this.question = document.createElement("textarea");
        this.question.id = "question";

        const button = document.createElement("button");
        button.setAttribute("type", "submit");
        button.className = "chat-button";
        button.innerText = "질문하기";

        this.chat_form.append(this.question, button);

        // 상위컴포넌트에 데이터 전송
        this.sendState = getState;

        this.setEvent();
    }

    setState(newState) {
        this.state = newState;
    }

    setEvent() {
        this.chat_form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleQuestion();
        });

        this.question.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.key == "Enter") {
                return;
            } else if (e.key == "Enter") {
                e.preventDefault();
                this.handleQuestion();
            }
        });
    }

    handleQuestion() {
        const question = this.question.value;
        if (question && !this.state.busy) {
            this.question.value = null;

            saveQuestion(data, question);

            this.sendState({
                busy: true,
            });

            this.setState({ busy: true });
        }
    }
}

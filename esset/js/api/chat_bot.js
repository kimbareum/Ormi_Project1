import OpenAiApi from "./open_ai_api.js";
import { makeBox, makeItem } from "../utils/dom_func.js";

export default class ChatBot extends OpenAiApi {
    constructor(data) {
        super(data);
        this.$hide_button = document.querySelector(".chat_hide");
        this.$window = document.querySelector(".chat_window");
        this.$form = document.querySelector(".chat_form");
        this.$button = document.querySelector(".chat_button");
        this.$screen = document.querySelector(".chat_screen");
        this.$input = document.querySelector("#question");
        this.addHideEvent();
        this.addButtonEvent();
        this.addEnterEvent();
    }

    scrollTop() {
        this.$screen.scrollTop = this.$screen.scrollHeight;
    }
    questionRender(question) {
        const user_chat = makeBox("div", "user_chat");
        const user_chat_content = makeItem("div", question, "chat_content");
        user_chat.append(user_chat_content);
        this.$screen.append(user_chat);
        this.scrollTop();
    }
    chatbotLoading() {
        const ai_chat = makeBox("div", "ai_chat");
        const loading_box = makeBox("div", "loading_bar");
        const loading_item1 = makeBox("span");
        const loading_item2 = makeBox("span");
        const loading_item3 = makeBox("span");
        ai_chat.append(loading_box);
        loading_box.append(loading_item1, loading_item2, loading_item3);
        this.$screen.append(ai_chat);
        this.scrollTop();
    }
    answerRender(answer) {
        this.$screen.removeChild(this.$screen.lastChild);
        if (answer) {
            this.saveAnswer(answer);
            const ai_chat = makeBox("div", "ai_chat");
            ai_chat.innerHTML = `<img src="./esset/img/robot_icon.png" alt="AI icon" />`;
            const ai_chat_content = makeItem("div", answer, "chat_content");
            ai_chat.append(ai_chat_content);
            this.$screen.append(ai_chat);
            this.scrollTop();
        }
    }
    async chatbotAction() {
        const question = this.$input.value;
        if (question) {
            this.$input.value = null;
            this.$button.setAttribute("disabled", "disabled");

            this.saveQuestion(question);
            this.questionRender(question);
            this.chatbotLoading();

            await this.apiPost(this.data)
                .then((answer) => {
                    this.answerRender(answer);
                })
                .catch((err) => {
                    console.log(err);
                    alert(
                        "죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요."
                    );
                });

            this.$hide_button.classList.add("notice");
            this.$button.removeAttribute("disabled");
        }
    }

    addHideEvent() {
        this.$hide_button.addEventListener("click", (e) => {
            this.$hide_button.classList.remove("notice");
            if (this.$window.classList.contains("hide")) {
                this.$window.classList.remove("hide");
                this.$hide_button.innerText = "숨기기";
                this.$hide_button.classList.add("open");
            } else {
                this.$window.classList.add("hide");
                this.$hide_button.innerHTML = `<img src="./esset/img/chatbot_icon.png" alt="챗봇 이미지" />`;
                this.$hide_button.classList.remove("open");
            }
        });
    }
    addButtonEvent() {
        this.$form.addEventListener("submit", async (e) => {
            e.preventDefault();
            this.chatbotAction();
        });
    }

    addEnterEvent() {
        this.$input.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.key == "Enter") {
                return;
            } else if (e.key == "Enter") {
                e.preventDefault();
                this.chatbotAction();
            }
        });
    }
}

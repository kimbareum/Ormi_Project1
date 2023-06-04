import apiPost from "../utils/open_ai_api.js";
import ChatScreen from "./chat_bot/ChatScreen.js";
import HideButton from "./chat_bot/HideButton.js";
import ChatForm from "./chat_bot/ChatForm.js";
import { saveQuestion, saveAnswer } from "../utils/data_record.js";
import { data_chatbot as data } from "../data/api_data.js";

export default class ChatBot {
    constructor($target) {
        this.state = {
            loading: false,
            question: "",
            answer: "",
            wait: false,
        };

        const $chat_bot = document.createElement("aside");
        $chat_bot.className = "chat-bot";
        const $window = document.createElement("div");
        $window.classList.add("chat-window", "hide");
        $chat_bot.append($window);

        this.chatScreen = new ChatScreen({ $window });

        this.chatForm = new ChatForm({
            $window,
            getQuestion: this.getQuestion,
        });

        this.hideButton = new HideButton({
            $chat_bot,
            $window,
        });

        $target.append($chat_bot);
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        if (this.state.question == "" || this.state.wait) {
            return;
        }
        this.chatScreen.setState(this.state);
        if (this.state.loading) {
            saveQuestion(data, this.state.question);
            this.getAnswer();
            this.state.wait = true;
        } else {
            saveAnswer(data, this.state.answer);
            // 챗봇 알림
            this.hideButton.toggleNotice(true);
        }
    }

    getQuestion = (question) => {
        this.setState({
            loading: true,
            question: question,
            answer: "",
            wait: this.state.wait,
        });
    };

    async getAnswer() {
        await apiPost(data)
            .then((res) => {
                this.setState({
                    loading: false,
                    question: this.state.question,
                    answer: res,
                    wait: false,
                });
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    question: "",
                    answer: "",
                    wait: false,
                });
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
    }
}

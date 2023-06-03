import { apiPost, saveQuestion, saveAnswer } from "../api/open_ai_api.js";
import ChatScreen from "./chat_bot/ChatScreen.js";
import HideButton from "./chat_bot/HideButton.js";
import ChatForm from "./chat_bot/ChatForm.js";
import { data_chatbot as data } from "../data/api_data.js";

export default class ChatBot {
    constructor($target) {
        this.state = { loading: true, question: "", answer: "" };

        const $chat_bot = document.createElement("chat-bot");
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
        this.action();
    }

    action() {
        this.chatScreen.setState(this.state);
        if (this.state.loading) {
            saveQuestion(data, this.state.question);
            this.getAnswer();
        } else {
            saveAnswer(data, this.state.answer);
        }
    }

    getQuestion = (question) => {
        this.setState({ loading: true, question: question, answer: "" });
    };

    async getAnswer() {
        await apiPost(data)
            .then((res) => {
                this.setState({
                    loading: false,
                    question: "",
                    answer: res,
                });
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    question: "",
                    answer: "",
                });
                console.log(err);
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
    }
}

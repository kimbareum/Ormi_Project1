export default class ChatScreen {
    constructor({ $window }) {
        this.state = { loading: false, question: "", answer: "" };
        this.$chat_screen = document.createElement("div");
        this.$chat_screen.className = "chat-screen";
        const $ai_chat = document.createElement("ai-chat");
        const $ai_icon = document.createElement("img");
        $ai_icon.src = "./esset/img/robot_icon.png";
        $ai_icon.alt = "AI icon";
        const $chat_content = document.createElement("chat-content");
        $chat_content.innerText = "반갑습니다. 어떤 것이 궁금하신가요?";

        this.$chat_screen.append($ai_chat);
        $ai_chat.append($ai_icon, $chat_content);

        $window.append(this.$chat_screen);
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        if (this.state.loading) {
            this.renderQuestion(this.state.question);
            this.renderLoading();
        } else {
            this.$chat_screen.removeChild(this.$chat_screen.lastChild);
            this.renderAnswer(this.state.answer);
        }
    }

    scrollTop() {
        this.$chat_screen.scrollTop = this.$chat_screen.scrollHeight;
    }

    renderLoading() {
        const ai_chat = document.createElement("ai-chat");
        const loading_box = document.createElement("loading-bar");
        const loading_item1 = document.createElement("span");
        const loading_item2 = document.createElement("span");
        const loading_item3 = document.createElement("span");
        ai_chat.append(loading_box);
        loading_box.append(loading_item1, loading_item2, loading_item3);
        this.$chat_screen.append(ai_chat);
        this.scrollTop();
    }

    renderQuestion(question) {
        const user_chat = document.createElement("user-chat");
        const user_chat_content = document.createElement("chat-content");
        user_chat_content.innerText = question;
        user_chat.append(user_chat_content);
        this.$chat_screen.append(user_chat);
    }

    renderAnswer(answer) {
        if (answer) {
            const ai_chat = document.createElement("ai-chat");
            ai_chat.innerHTML = `<img src="./esset/img/robot_icon.png" alt="AI icon" />`;
            const ai_chat_content = document.createElement("chat-content");
            ai_chat_content.innerText = answer;
            ai_chat.append(ai_chat_content);
            this.$chat_screen.append(ai_chat);
            this.scrollTop();
        }
    }
}

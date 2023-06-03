export default class ChatForm {
    constructor({ $window, getQuestion }) {
        const $chat_form = document.createElement("form");
        $chat_form.setAttribute("action", "post");
        $chat_form.className = "chat-form";

        const $question = document.createElement("textarea");
        $question.className = "question";

        const $button = document.createElement("button");
        $button.setAttribute("type", "submit");
        $button.className = "chat-button";
        $button.innerText = "질문하기";

        $chat_form.addEventListener("submit", (e) => {
            e.preventDefault();
            if ($question.value) {
                getQuestion($question.value);
                $question.value = null;
            }
        });

        $question.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.key == "Enter") {
                return;
            } else if (e.key == "Enter") {
                e.preventDefault();
                getQuestion($question.value);
                $question.value = null;
            }
        });

        $window.append($chat_form);
        $chat_form.append($question, $button);
    }
}

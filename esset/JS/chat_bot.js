const $chat_hide = document.querySelector(".chat_hide");
const $chat_window = document.querySelector(".chat_window");
const $form_chatbot = document.querySelector(".chat_form");
const $chat_btn = document.querySelector(".chat_button");
const $chat_screen = document.querySelector(".chat_screen");
const $question = document.querySelector("#question");

let data_chatbot = [
    {
        role: "system",
        content: "assistant는 여행 관련 질문에 대답해주는 여행 전문가야.",
    },
];

//////////////////////////////////////////
// 챗봇 열고 숨기기
//////////////////////////////////////////

$chat_hide.addEventListener("click", (e) => {
    if ($chat_window.classList.contains("hide")) {
        $chat_window.classList.remove("hide");
        $chat_hide.innerText = "숨기기";
        $chat_hide.classList.add("open");
    } else {
        $chat_window.classList.add("hide");
        $chat_hide.innerHTML = `<img src="./esset/img/chatbot_icon.png" alt="챗봇 이미지" />`;
        $chat_hide.classList.remove("open");
    }
});

//////////////////////////////////////////
// 챗봇 질문
//////////////////////////////////////////

// 챗봇 질문 화면에 렌더링
const printQuestion_chatbot = (question) => {
    const user_chat = make_box("div", "user_chat");
    const user_chat_content = make_item("div", question, "chat_content");
    user_chat.append(user_chat_content);
    $chat_screen.append(user_chat);
    $chat_window.scrollTop = $chat_screen.scrollHeight;
};

// 챗봇 로딩바 생성
const loading_chatbot = (_) => {
    const ai_chat = make_box("div", "ai_chat");
    const loading_chatbot = make_box("div", "loading_bar");
    const loading_item1 = make_box("span");
    const loading_item2 = make_box("span");
    const loading_item3 = make_box("span");
    ai_chat.append(loading_chatbot);
    loading_chatbot.append(loading_item1, loading_item2, loading_item3);
    $chat_screen.append(ai_chat);
    $chat_window.scrollTop = $chat_window.scrollHeight;
};

// 챗봇 답변 화면에 표시
const printAnswer_chatbot = (answer) => {
    $chat_screen.removeChild($chat_screen.lastChild);
    if (answer) {
        saveAnswer(data_chatbot, answer);
        const ai_chat = make_box("div", "ai_chat");
        ai_chat.innerHTML = `<img src="./esset/img/robot_icon.png" alt="AI icon" />`;
        const ai_chat_content = make_item("div", answer, "chat_content");
        ai_chat.append(ai_chat_content);
        $chat_screen.append(ai_chat);
        $chat_window.scrollTop = $chat_screen.scrollHeight;
    }
};

// 챗봇 버튼 처리
$form_chatbot.addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = $question.value;
    if (question) {
        $question.value = null;
        $chat_btn.toggleAttribute("disabled");
        sendQuestion(data_chatbot, question);
        printQuestion_chatbot(question);
        loading_chatbot();
        await apiPost(data_chatbot)
            .then((answer) => {
                printAnswer_chatbot(answer);
            })
            .catch((err) => {
                console.log(err);
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
        $chat_btn.removeAttribute("disabled");
    }
});

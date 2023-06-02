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
    $chat_hide.classList.remove("notice");
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
const questionRender = (question) => {
    const user_chat = makeBox("div", "user_chat");
    const user_chat_content = makeItem("div", question, "chat_content");
    user_chat.append(user_chat_content);
    $chat_screen.append(user_chat);
    $chat_window.scrollTop = $chat_screen.scrollHeight;
};

// 챗봇 로딩바 생성
const chatbotLoading = (_) => {
    const ai_chat = makeBox("div", "ai_chat");
    const loading_box = makeBox("div", "loading_bar");
    const loading_item1 = makeBox("span");
    const loading_item2 = makeBox("span");
    const loading_item3 = makeBox("span");
    ai_chat.append(loading_box);
    loading_box.append(loading_item1, loading_item2, loading_item3);
    $chat_screen.append(ai_chat);
    $chat_screen.scrollTop = $chat_window.scrollHeight;
};

// 챗봇 답변 화면에 표시
const answerRender = (answer) => {
    $chat_screen.removeChild($chat_screen.lastChild);
    if (answer) {
        saveAnswer(data_chatbot, answer);
        const ai_chat = makeBox("div", "ai_chat");
        ai_chat.innerHTML = `<img src="./esset/img/robot_icon.png" alt="AI icon" />`;
        const ai_chat_content = makeItem("div", answer, "chat_content");
        ai_chat.append(ai_chat_content);
        $chat_screen.append(ai_chat);
        $chat_screen.scrollTop = $chat_screen.scrollHeight;
    }
};

// 챗봇 액션 처리
const chatbotAction = async (_) => {
    const question = $question.value;
    if (question) {
        $question.value = null;
        $chat_btn.toggleAttribute("disabled");
        saveQuestion(data_chatbot, question);
        questionRender(question);
        chatbotLoading();

        await apiPost(data_chatbot)
            .then((answer) => {
                answerRender(answer);
            })
            .catch((err) => {
                console.log(err);
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
        $chat_hide.classList.add("notice");
        $chat_btn.removeAttribute("disabled");
    }
};

// 챗봇 submit 버튼 액션
$form_chatbot.addEventListener("submit", async (e) => {
    e.preventDefault();
    chatbotAction();
});
// 챗봇 textarea Enter키 액션
$question.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key == "Enter") {
        return;
    } else if (e.key == "Enter") {
        e.preventDefault();
        chatbotAction();
    }
});

// 여행계획생성기 관련
const $form_gt = document.querySelector(".generator");
const $target = document.querySelector("#target");
const $start_date = document.querySelector("#start_date");
const $end_date = document.querySelector("#end_date");
const $main_target = document.querySelector("#main_target");
const $answer_container = document.querySelector(".answer_container");
const $loading = document.querySelector(".loading");

// 챗봇 관련
const $chat_hide = document.querySelector(".chat_hide");
const $chat_window = document.querySelector(".chat_window");
const $form_cb = document.querySelector(".chat_form");
const $chat_btn = document.querySelector(".chat_button");
const $chat_screen = document.querySelector(".chat_screen");
const $question = document.querySelector("#question");

// 슬라이딩 관련
const $slide = document.querySelector(".slide");
const $prev_btn = document.querySelector(".slide_prev_button");
const $next_btn = document.querySelector(".slide_next_button");
const $slideItems = document.querySelectorAll(".slide_item");

// openAI API
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

//////////////////////////////////////////
// 공통기능
//////////////////////////////////////////
const make_box = (type, ...classList) => {
    const box = document.createElement(type);
    box.classList.add(...classList);
    return box;
};

const make_item = (type, data, ...classList) => {
    const item = document.createElement(type);
    item.classList.add(...classList);
    item.innerText = data;
    return item;
};

//////////////////////////////////////////
// 슬라이딩 구현
//////////////////////////////////////////
const slideLeft = (_) => {
    $slideItems.forEach((i) => {
        i.classList.remove("right");
    });
};

const slideRight = (_) => {
    $slideItems.forEach((i) => {
        i.classList.add("right");
    });
};

$next_btn.addEventListener("click", slideRight);
$prev_btn.addEventListener("click", slideLeft);

//////////////////////////////////////////
// 챗봇 동작
//////////////////////////////////////////

// 챗봇 열고 숨기기
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

// 챗봇 로딩바
const loading_cb = (_) => {
    const ai_chat = make_box("div", "ai_chat");
    const loading_cb = make_box("div", "loading_bar");
    const loading_item1 = make_box("span");
    const loading_item2 = make_box("span");
    const loading_item3 = make_box("span");
    ai_chat.append(loading_cb);
    loading_cb.append(loading_item1, loading_item2, loading_item3);
    $chat_screen.append(ai_chat);
    $chat_window.scrollTop = $chat_window.scrollHeight;
};

//////////////////////////////////////////
// Fetch
//////////////////////////////////////////

const apiPost = async (data) => {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const text = res.choices[0].message.content;
            console.log(text);
            return text;
        })
        .catch((err) => {
            return err;
        });
};

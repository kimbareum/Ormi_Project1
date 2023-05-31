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
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// AI 초기세팅 및 질문답변 저장
let data_gt = [
    {
        role: "system",
        content: `assistant는 여행계획 생성기야. 다음 사항들을 지켜서 여행 계획을 짜줘.`,
    },
    {
        role: "system",
        content: `다음과 같은 양식으로 데이터를 전달받을거야. '여행지:여행지, 시작일:연도-월-일/도착한 시간:분, 종료일:연도-월-일/출발할 시간:분, 주요여행지:주요여행지들'. 시간은 24시 표기법이야. 입력값을 바탕으로 여행계획을 생성해줘.
        주요여행지는 반드시 포함되어야해. 만약 주요여행지값이 없다면 자유롭게 짜도 괜찮아. 하루의 일정은 출발일의 도착시간과 종료일의 출발시간을 고려해서 아침식사, 오전, 점심식사, 오후, 저녁식사, 야간 일정이 가능한 한 들어가야하고 식사일정을 짤때는 추천 메뉴를 적어줘. 세부일정도 모두 네가 짜줘야 하는 부분이야. 거리와  고려해서 일정을 짜줘. 
        일정 내부에서는 ' 를 사용해선 안돼.     
        여행계획은 다음과 같은 JSON text로 전달해줘야해. {"$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["$시 $분 = 세부일정", "$시 $분 = 세부일정", ...]"}, "$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["$시 $분 = 세부일정", "$시 $분 = 세부일정", ...]"} }. 이 양식은 절대로 지켜져야해.
        하루의 일정은 한 Array 안에 담아주고 출발일의 도착한 시간이전에 일정을 잡지 마. 그리고 마지막날은 종료일의 출발할 시간과 공항이나 기차역 까지의 거리를 고려해서 적당한 일정을 만들어줘.`,
    },
    {
        role: "system",
        content: `양식은 절대로 지켜야해. 일정안의 세부일정은 Array로 잘 분리되어있어야하고, 전체적인 데이터는 반드시 정상적인 JSON string이여야만해. 보내주기전에 JSON 양식을 잘 지켰는지 확인하고, 지켜지지않았다면 수정하고 보내줘. 수정과정이나 다른 질문은 필요없어. JSON 만 돌려줘.`,
    },
];

let data_cb = [
    {
        role: "system",
        content: "assistant는 여행 관련 질문에 대답해주는 여행 전문가야.",
    },
];

////////////////////////////////////////////
// 공통기능
////////////////////////////////////////////
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
///////////////////////////////////////////
// 슬라이딩 구현
///////////////////////////////////////////
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
// 여행계획 생성기 부분
//////////////////////////////////////////

// 여행계획이 들어갈 table 생성
const make_cardItem = (data) => {
    const card = make_box("table", "card");
    const th_box = make_box("tr", "date_box");
    const th_item = make_item("th", data["날짜"], "date");
    th_item.setAttribute("colspan", "2");
    th_box.append(th_item);
    card.append(th_box);
    for (const plan of data["일정"]) {
        const tr_plan = make_box("tr", "plan_box");
        const plan_data = plan.split("=");
        const td_date = make_item("td", plan_data[0].trim(), "time");
        const td_plan = make_item("td", plan_data[1].trim(), "plan");
        tr_plan.append(td_date, td_plan);
        card.append(tr_plan);
    }
    return card;
};

// 여행계획 카드 전체 생성.
const printAnswer_gt = (answer) => {
    const answer_box = make_box("div", "answer_box");
    const answer_label = make_item("div", $target.value, "answer_label");
    const card_box = make_box("div", "card_box");
    $answer_container.append(answer_box);
    answer_box.append(answer_label, card_box);

    for (const idx in answer) {
        card = make_cardItem(answer[idx]);
        card_box.append(card);
    }
    slideRight();
};

// 여행계획 api 응답 받기.
const apiPost_gt = async () => {
    $loading.classList.add("visible");
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data_gt),
        redirect: "follow",
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const text = res.choices[0].message.content;
            console.log(text);
            $loading.classList.remove("visible");
            try {
                const answer = JSON.parse(
                    text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)
                );
                data_gt.pop();
                console.log(answer);
                printAnswer_gt(answer);
            } catch {
                console.log("json error");
                data_gt.pop();
            }
        })
        .catch((err) => {
            console.log(err);
            data_gt.pop();
            $loading.classList.remove("visible");
        });
};

// 여행계획 질문 임시 저장.
const sendQuestion_gt = (question) => {
    if (question) {
        data_gt.push({
            role: "user",
            content: question,
        });
    }
};

// 질문 양식 정리
const createQuestion_gt = (_) => {
    const target = $target.value;
    const start_date = $start_date.value.split("T");
    const end_date = $end_date.value.split("T");
    const main_target = $main_target.value;
    if (main_target == undefined) main_target = "";
    return `여행지:${target}, 시작일:${start_date[0]}/${start_date[1]}, 종료일:${end_date[0]}/${end_date[1]}, 주요여행지:${main_target}`;
};

// 여행계획 생성기 버튼 처리.
$form_gt.addEventListener("submit", (e) => {
    e.preventDefault();
    const question_gt = createQuestion_gt();
    sendQuestion_gt(question_gt);
    apiPost_gt();
});

/////////////////////////////////////////////////
// 여행 챗봇 부분
/////////////////////////////////////////////////

// 챗봇 열고 숨기기
$chat_hide.addEventListener("click", () => {
    if ($chat_hide.innerText == "숨기기") {
        $chat_window.classList.add("hide");
        $chat_hide.innerText = "펼치기";
    } else {
        $chat_window.classList.remove("hide");
        $chat_hide.innerText = "숨기기";
    }
});

// 챗봇 질문 저장
const sendQuestion_cb = (question) => {
    if (question) {
        data_cb.push({
            role: "user",
            content: question,
        });
    }
};

// 챗봇 답변 저장
const saveQuestion_cb = (answer) => {
    if (answer) {
        data_cb.push({
            role: "assistant",
            content: answer,
        });
    }
};

// 챗봇 질문 화면에 표시
const printQuestion_cb = (question) => {
    const user_chat = make_box("div", "user_chat");
    const user_chat_content = make_item("div", question, "chat_content");
    user_chat.append(user_chat_content);
    $chat_screen.append(user_chat);
};

// 챗봇 답변 화면에 표시
const printAnswer_cb = (answer) => {
    saveQuestion_cb(answer);
    const ai_chat = make_box("div", "ai_chat");
    const ai_chat_content = make_item("div", answer, "chat_content");
    ai_chat.append(ai_chat_content);
    $chat_screen.append(ai_chat);
};

// 챗봇 질문 API 요청
const apiPost_cb = async () => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data_cb),
        redirect: "follow",
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            $chat_btn.removeAttribute("disabled");
            printAnswer_cb(res.choices[0].message.content);
        })
        .catch((err) => {
            $chat_btn.removeAttribute("disabled");
            console.log(err);
        });
};

// 챗봇 버튼 처리
$form_cb.addEventListener("submit", (e) => {
    e.preventDefault();
    $chat_btn.toggleAttribute("disabled");
    const question = $question.value;
    $question.value = null;
    sendQuestion_cb(question);
    printQuestion_cb(question);
    apiPost_cb();
});

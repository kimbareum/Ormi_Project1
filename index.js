const $form_gt = document.querySelector(".generator");
const $target = document.querySelector("#target");
const $start_date = document.querySelector("#start_date");
const $end_date = document.querySelector("#end_date");
const $main_target = document.querySelector("#main_target");
const $answer_container = document.querySelector(".answer_container");

const $chat_button = document.querySelector(".chat_button");
const $chat_window = document.querySelector(".chat-window");

const $loading = document.querySelector(".loading");

const $slide = document.querySelector(".slide");
const slideWidth = $slide.clientWidth;
const $prevBtn = document.querySelector(".slide_prev_button");
const $nextBtn = document.querySelector(".slide_next_button");
const $slideItems = document.querySelectorAll(".slide_item");

/* 슬라이딩 구현 */
let currSlide = 1;

const slideLeft = (_) => {
    currSlide = 1;
    const offset = slideWidth * (currSlide - 1);
    $slideItems.forEach((i) => {
        i.setAttribute("style", `left: ${-offset}px`);
    });
};

const slideRight = (_) => {
    console.log("!!");
    currSlide = 2;
    const offset = slideWidth * (currSlide - 1);
    $slideItems.forEach((i) => {
        i.setAttribute("style", `left: ${-offset}px`);
    });
};

$nextBtn.addEventListener("click", slideRight);

$prevBtn.addEventListener("click", slideLeft);

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let question;

// 질문과 답변 저장
let data_gt = [
    {
        role: "system",
        content: `assistant는 여행계획 생성기야. 다음 사항들을 지켜서 여행 계획을 짜줘.`,
    },
    {
        role: "system",
        content: `다음과 같은 양식으로 데이터를 전달받을거야. '여행지:여행지, 시작일:연도-월-일/도착한 시간:분, 종료일:연도-월-일/출발할 시간:분, 주요여행지:주요여행지들'. 시간은 24시시간 표기법이야. 입력값을 바탕으로 여행계획을 생성해줘.
        주요여행지는 반드시 포함되어야하고 입력값이 없다면 자유롭게 짜도 괜찮아. 하루의 일정은 출발일의 도착시간과 종료일의 출발시간을 고려해서 아침식사, 오전, 점심식사, 오후, 저녁식사, 야간 일정이 가능한 한 들어가야하고 식사일정을 짤때는 추천 메뉴를 적어줘. 세부일정도 모두 네가 짜줘야 하는 부분이야. 거리와  고려해서 일정을 짜줘. 
        일정 내부에서는 ' 를 사용해선 안돼. 
        여행계획은 다음과 같은 JSON text로 전달해줘야해. {"$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["$시 $분 : 세부일정", "$시 $분 : 세부일정", ...]"}, "$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["$시 $분 : 세부일정", "$시 $분 : 세부일정", ...]"} }. 이 양식은 절대로 지켜져야해.
        하루의 일정은 한 Array 안에 담아주고 출발일의 도착한 시간이전에 일정을 잡지 마. 그리고 마지막날은 공항이나 기차역 까지의 거리를 고려해서 적당한 일정을 만들어줘.`,
    },
    {
        role: "system",
        content: `추가적인 질문은 하지말고 바로 JSON text 형태의 여행계획을 알려줘. 양식 절대로 지켜야해. 정상적인 JSON string이여야만해.`,
    },
];

let data_cb = [
    {
        role: "system",
        content: "assistant는 여행 관련 질문에 대답해주는 여행 전문가야.",
    },
];

/* 여행계획 생성기 부분 */
let answer_gt = [];
let test;

const make_box = (...classList) => {
    const box = document.createElement("div");
    box.classList.add(...classList);
    return box;
};

const make_item = (data, ...classList) => {
    const item = document.createElement("div");
    item.classList.add(...classList);
    item.innerText = data;
    return item;
};

const printAnswer = (answer) => {
    const answer_box = make_box($target.value, "answer_box");
    answer_box.innerText = $target.value;
    $answer_container.append(answer_box);

    for (const idx in answer) {
        const card = make_box("card");
        const date_box = make_box("date_box");
        const date = make_item(answer[idx]["날짜"], "date");
        const plan_box = make_box("plan_box");
        for (const plan of answer[idx]["일정"]) {
            const plan_item = make_item(plan, "plan");
            plan_box.append(plan_item);
        }
        date_box.append(date);
        card.append(date_box, plan_box);
        answer_box.append(card);
    }
    slideRight();
};

const apiPost = async () => {
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
            // try {
            const answer = JSON.parse(
                text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)
            );
            data_gt.pop();
            console.log(answer);
            printAnswer(answer);
            // } catch {
            //     console.log("json error");
            //     data_gt.pop();
            // }
        })
        .catch((err) => {
            console.log(err);
            data_gt.pop();
            $loading.classList.remove("visible");
        });
};

const sendQuestion = (question) => {
    if (question) {
        data_gt.push({
            role: "user",
            content: question,
        });
    }
};

$form_gt.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = $target.value;
    const start_date = $start_date.value.split("T");
    const end_date = $end_date.value.split("T");
    const main_target = $main_target.value;
    if (main_target == undefined) main_target = "";
    const question_gt = `여행지:${target}, 시작일:${start_date[0]}/${start_date[1]}, 종료일:${end_date[0]}/${end_date[1]}, 주요여행지:${main_target}`;
    // console.log(
    //     `여행지:${target}, 시작일:${start_date}, 종료일:${end_date}, 주요여행지:${main_target}`
    // );
    sendQuestion(question_gt);
    apiPost();
});

/* 여행 챗봇 부분 */

$chat_button.addEventListener("click", () => {
    if ($chat_button.innerText == "숨기기") {
        $chat_window.classList.add("hide");
        $chat_button.innerText = "펼치기";
    } else {
        $chat_window.classList.remove("hide");
        $chat_button.innerText = "숨기기";
    }
});

// 화면에 뿌려줄 데이터, 질문들
/*
let questionData = [];

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
    question = e.target.value;
});

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (question) => {
    if (question) {
        data.push({
            role: "user",
            content: question,
        });
        questionData.push({
            role: "user",
            content: question,
        });
    }
};

// 화면에 질문 그려주는 함수
const printQuestion = async () => {
    if (question) {
        let li = document.createElement("li");
        li.classList.add("question");
        questionData.map((el) => {
            li.innerText = el.content;
        });
        $chatList.appendChild(li);
        questionData = [];
        question = false;
    }
};

// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
    let li = document.createElement("li");
    li.classList.add("answer");
    li.innerText = answer;
    $chatList.appendChild(li);
};

// api 요청보내는 함수
const apiPost = async () => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then((res) => {
            console.log(data);
            return res.json();
        })
        .then((res) => {
            printAnswer(res.choices[0].message.content);
        })
        .catch((err) => {
            console.log(err);
        });
};

// submit
$form.addEventListener("submit", (e) => {
    e.preventDefault();
    $input.value = null;
    sendQuestion(question);
    apiPost();
    printQuestion();
});
*/

const $slide = document.querySelector(".slide");
const $slide_btn = document.querySelector(".slide_button");
const $slideItems = document.querySelectorAll(".slide_item");
const $gen_label = document.querySelector(".gen_label>img");
const $plan_label = document.querySelector(".plan_label");

// openAI API
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

//////////////////////////////////////////
// Darkmode 확인
//////////////////////////////////////////

const runColorMode = (fn) => {
    if (!window.matchMedia) {
        return;
    }
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    fn(query.matches);

    query.addEventListener("change", (event) => {
        fn(event.matches);
    });
};

runColorMode((isDarkMode) => {
    if (isDarkMode) {
        $gen_label.setAttribute("src", "./esset/img/generator_label_dark.png");
        $plan_label.setAttribute("src", "./esset/img/plan_label_dark.png");
    } else {
        $gen_label.setAttribute("src", "./esset/img/generator_label.png");
        $plan_label.setAttribute("src", "./esset/img/plan_label.png");
    }
});

//////////////////////////////////////////
// DOM node 생성용 함수
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
// 슬라이딩기능 구현
//////////////////////////////////////////

const slide = (_) => {
    if ($slideItems[0].classList.contains("right")) {
        $slideItems.forEach((i) => {
            i.classList.remove("right");
        });
    } else {
        $slideItems.forEach((i) => {
            i.classList.add("right");
        });
    }
};

$slide_btn.addEventListener("click", slide);

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

//////////////////////////////////////////
// 이후의 질답에 영향을 주도록
// API로 주고받은 질문과 답변을 저장.
//////////////////////////////////////////

const saveQuestion = (data, question) => {
    if (question) {
        data.push({
            role: "user",
            content: question,
        });
    }
};

const saveAnswer = (data, answer) => {
    if (answer) {
        data.push({
            role: "assistant",
            content: answer,
        });
    }
};

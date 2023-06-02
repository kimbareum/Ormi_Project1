const $slide = document.querySelector(".slide");
const $slide_btn = document.querySelector(".slide_button");
const $slideItems = document.querySelectorAll(".slide_item");
const $gen_label = document.querySelector(".gen_label>img");
const $plan_label = document.querySelector(".plan_label");

let startPoint = 0;
let endPoint = 0;

// openAI API
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

//////////////////////////////////////////
// DOM node 생성용 함수
//////////////////////////////////////////
const makeBox = (type, ...classList) => {
    const box = document.createElement(type);
    box.classList.add(...classList);
    return box;
};

const makeItem = (type, data, ...classList) => {
    const item = document.createElement(type);
    item.classList.add(...classList);
    item.innerText = data;
    return item;
};

//////////////////////////////////////////
// 슬라이딩기능 구현
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

const slide = (_) => {
    if ($slideItems[0].classList.contains("right")) {
        slideLeft();
    } else {
        slideRight();
    }
};

// 버튼클릭
$slide_btn.addEventListener("click", slide);

// 마우스 드래그
$slide.addEventListener("mousedown", (e) => {
    startPoint = e.pageX;
});

$slide.addEventListener("mouseup", (e) => {
    endPoint = e.pageX;
    if (startPoint < endPoint && endPoint - startPoint >= 100) {
        slideLeft();
    } else if (startPoint > endPoint && startPoint - endPoint >= 100) {
        slideRight();
    }
});

// 모바일 스와이프
$slide.addEventListener("touchstart", (e) => {
    startPoint = e.touches[0].pageX;
    console.log(e.touches);
});

$slide.addEventListener("touchend", (e) => {
    endPoint = e.changedTouches[0].pageX;
    console.log(e.touches);
    if (startPoint < endPoint && endPoint - startPoint >= 100) {
        slideLeft();
    } else if (startPoint > endPoint && startPoint - endPoint >= 100) {
        slideRight();
    }
});
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
// API 요청 및 응답 내역 저장 함수
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

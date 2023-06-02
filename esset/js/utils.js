const $slide = document.querySelector(".slide");
const $slide_btn = document.querySelector(".slide_button");
const $slideItems = document.querySelectorAll(".slide_item");
const $gen_label = document.querySelector(".gen_label>img");
const $plan_label = document.querySelector(".plan_label");

let startPointX = 0;
let startPointY = 0;
let endPointX = 0;
let endPointY = 0;

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

// 버튼클릭 슬라이드
$slide_btn.addEventListener("click", slide);

// 마우스 드래그 슬라이드
$slide.addEventListener("mousedown", (e) => {
    startPointX = e.pageX;
    startPointY = e.pageY;
});

$slide.addEventListener("mouseup", (e) => {
    endPointX = e.pageX;
    endPointY = e.pageY;
    // 복사를 위해 세로로 200px 이상 움직이면 슬라이드 안되게 설정.
    if (Math.abs(startPointY - endPointY) >= 200) {
        return;
    }
    if (startPointX < endPointX && endPointX - startPointX >= 150) {
        slideLeft();
    } else if (startPointX > endPointX && startPointX - endPointX >= 150) {
        slideRight();
    }
});

// 모바일 스와이프 슬라이드
$slide.addEventListener("touchstart", (e) => {
    startPoint = e.touches[0].pageX;
});

$slide.addEventListener("touchend", (e) => {
    endPoint = e.changedTouches[0].pageX;
    if (startPoint < endPoint && endPoint - startPoint >= 80) {
        slideLeft();
    } else if (startPoint > endPoint && startPoint - endPoint >= 80) {
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

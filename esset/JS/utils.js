const $slide = document.querySelector(".slide");
const $prev_btn = document.querySelector(".slide_prev_button");
const $next_btn = document.querySelector(".slide_next_button");
const $slideItems = document.querySelectorAll(".slide_item");

// openAI API
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

//////////////////////////////////////////
// DOM node 생성
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
// 슬라이딩
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

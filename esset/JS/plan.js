const $form_generator = document.querySelector(".generator");
const $target = document.querySelector("#target");
const $start_date = document.querySelector("#start_date");
const $end_date = document.querySelector("#end_date");
const $extra_condition = document.querySelector("#extra_condition");
const $answer_container = document.querySelector(".answer_container");
const $loading = document.querySelector(".loading");

let data_generator = [
    {
        role: "system",
        content: `assistant는 여행계획 생성기야.`,
    },
    {
        role: "user",
        content:
            "여행계획은 이 양식으로 전달될거야. '{target} 여행을 떠날거야. 여행 시작일은 {start_date}이고, 여행지에 도착하는 시간은 {start_time}야. 여행이 끝나는 날은 {end_date}고, {end_time}에 여행지를 떠나야해. 그 외의 여행 조건은 다음과 같아. {extra condition}'. 그 외의 여행 조건은 없을수도 있어. 없으면 자유여행계획을 짜면 돼. 추가적인 질문은 하지말고 주어진 데이터로만 여행계획을 짜면 돼.",
    },
    {
        role: "user",
        content: `일정은 여행지에 도착하는 시간이후부터 만들어. 여행지를 떠나야하는 시간이 되면 여행지를 벗어나는 일정을 짜고 일정 짜는걸 멈춰. 아침식사, 오전, 점심식사, 오후, 저녁식사, 야간 일정이 시간이 되는 한 들어가야하고 식사일정을 짤때는 추천 메뉴를 적어줘. 거리와 시간을 고려해서 일정을 짜줘. 단, 일정은 최대 6개여야해. 일정 내부에서는 ' 를 사용해선 안돼.  
        `,
    },
    {
        role: "user",
        content: `여행계획은 다음과 같은 JSON 형식으로 전달해줘. {"$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["시간:분  = 세부일정", "시간:분 = 세부일정", "시간:분 = 세부일정", "시간:분 = 세부일정", "시간:분 = 세부일정", "시간:분 = 세부일정"]"}, "$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["시간:분  = 세부일정", "시간:분  = 세부일정", "시간:분 = 세부일정", "시간:분 = 세부일정", "시간:분 = 세부일정", "시간:분 = 세부일정", "시간:분 = 세부일정"]"} }. 응답하기 전에 JSON 문법을 검사하고 수정해서 보내줘. 수정과정은 필요없어.`,
    },
];

// 질문 양식 정리
const createQuestion = (_) => {
    const target = $target.value;
    const start_date = $start_date.value.split("T");
    const end_date = $end_date.value.split("T");
    const extra_condition = $extra_condition.value;
    if (extra_condition == undefined) {
        return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]}이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]}고, ${end_date[1]}에 여행지를 떠나야해.`;
    }
    return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]}이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]}고, ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 다음과 같아.${extra_condition}`;
};

// 여행계획 JSON parsing 하기
const json_parsing = (text) => {
    if (text) {
        let answer = null;
        let newText = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
        try {
            answer = JSON.parse(newText);
        } catch {
            answer = JSON.parse(newText + "}");
        }
        console.log(answer);
        return answer;
    }
};

// 여행계획이 들어갈 table 생성
const make_cardItem = (data) => {
    if (data) {
        const card = make_box("table", "card");
        const th_box = make_box("tr", "date_box");
        const th_item = make_item("th", data["날짜"], "date");
        th_item.setAttribute("colspan", "2");
        th_box.append(th_item);
        card.append(th_box);
        // th 제외한 tr 6줄로 고정
        for (let i = 0; i < 6; i++) {
            const tr_plan = make_box("tr", "plan_box");
            const td_date = make_box("td", "time");
            const td_plan = make_box("td", "plan");
            if (i < data["일정"].length) {
                const plan_data = data["일정"][i].split("=");
                td_date.textContent = plan_data[0].trim();
                td_plan.textContent = plan_data[1].trim();
            }
            tr_plan.append(td_date, td_plan);
            card.append(tr_plan);
        }
        // for (const plan of data["일정"]) {
        //     const tr_plan = make_box("tr", "plan_box");
        //     const plan_data = plan.split("=");
        //     const td_date = make_item("td", plan_data[0].trim(), "time");
        //     const td_plan = make_item("td", plan_data[1].trim(), "plan");
        //     tr_plan.append(td_date, td_plan);
        //     card.append(tr_plan);
        // }
        return card;
    }
};

// 여행계획 카드 전체 생성.
const printAnswer_generator = (answer) => {
    if (answer) {
        const answer_box = make_box("div", "answer_box");
        const answer_label = make_item(
            "div",
            `${$target.value} 여행 계획`,
            "answer_label"
        );
        const card_box = make_box("div", "card_box");
        $answer_container.append(answer_box);
        answer_box.append(answer_label, card_box);

        for (const idx in answer) {
            card = make_cardItem(answer[idx]);
            card_box.append(card);
        }
        slide();
    }
};
// 여행계획 생성기 버튼 처리.
$form_generator.addEventListener("submit", async (e) => {
    e.preventDefault();
    $loading.classList.remove("hide");
    const question = createQuestion();
    saveQuestion(data_generator, question);
    await apiPost(data_generator)
        .then((res) => {
            const json_res = json_parsing(res);
            printAnswer_generator(json_res);
        })
        .catch((err) => {
            console.log(err);
            alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
        });
    data_generator.pop();
    $loading.classList.add("hide");
});

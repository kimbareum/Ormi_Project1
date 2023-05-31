const $form_gt = document.querySelector(".generator");
const $target = document.querySelector("#target");
const $start_date = document.querySelector("#start_date");
const $end_date = document.querySelector("#end_date");
const $main_target = document.querySelector("#main_target");
const $answer_container = document.querySelector(".answer_container");
const $loading = document.querySelector(".loading");

let data_gt = [
    {
        role: "system",
        content: `assistant는 여행계획 생성기야. 다음 사항들을 지켜서 여행 계획을 짜줘.`,
    },
    {
        role: "user",
        content: `다음과 같은 양식으로 데이터를 전달받을거야. '여행지:여행지, 시작일:연도-월-일/도착한 시간:분, 종료일:연도-월-일/출발할 시간:분, 여행조건:여행조건들'. 시간은 24시 표기법이야. 입력값을 바탕으로 여행지를 여행하는 여행계획을 생성해줘.
        하루의 일정은 출발일의 도착시간과 종료일의 출발시간을 고려해서 아침식사, 오전, 점심식사, 오후, 저녁식사, 야간 일정이 가능한 한 들어가야하고 식사일정을 짤때는 추천 메뉴를 적어줘. 세부일정도 모두 네가 짜줘야 하는 부분이야. 거리와 시간을 고려해서 일정을 짜줘. 일정 내부에서는 ' 를 사용해선 안돼. 추가적인 질문은 받지 않아. 전해준 데이터만으로 여행계획을 세워줘.  
        `,
    },
    {
        role: "user",
        content: `여행조건의 값이 없다면 자유롭게 짜면 돼. 여행조건이 없을때 달라고 요청하지 마. 만약 여행조건이 있다면 일정을 여행조건을 고려해서 짜야만 해. 같은장소를 여러번 방문하는건 여행조건에서 요구하지 않는 한 자제 해줘.`,
    },
    {
        role: "user",
        content: `여행계획은 다음과 같은 JSON 형식으로 전달해줘야해. 형식 = {"$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["$시 $분 = 세부일정", "$시 $분 = 세부일정", ...]"}, "$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["$시 $분 = 세부일정", "$시 $분 = 세부일정", ...]"} }. 이 양식은 절대로 지켜져야해.
        하루의 일정은 한 Array 안에 담아주고 출발일의 도착한 시간이전에 일정을 잡지 마. 그리고 마지막날은 종료일의 출발할 시간과 공항이나 기차역 까지의 거리를 고려해서 적당한 일정을 만들어줘.`,
    },
    {
        role: "user",
        content: `양식은 절대로 지켜야해. 일정안의 세부일정은 Array로 잘 분리되어있어야하고, 전체적인 데이터는 반드시 정상적인 JSON string이여야만해. 보내주기전에 JSON 양식을 잘 지켰는지 확인하고, 지켜지지않았다면 수정하고 보내줘. 수정과정이나 다른 질문은 필요없어. 코드를 짤 필요도없고, 수정과정을 알려줄필요도 없어. 형식에 맞는 데이터만 돌려줘.`,
    },
];

// 여행계획이 들어갈 table 생성
const make_cardItem = (data) => {
    if (data) {
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
    }
};

// 여행계획 카드 전체 생성.
const printAnswer_gt = (answer) => {
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
        slideRight();
    }
};

// 여행계획 JSON parsing 하기
const json_parsing = (text) => {
    if (text) {
        const answer = JSON.parse(
            text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)
        );
        console.log(answer);
        return answer;
    }
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
$form_gt.addEventListener("submit", async (e) => {
    e.preventDefault();
    $loading.classList.remove("hide");
    const question_gt = createQuestion_gt();
    sendQuestion_gt(question_gt);
    const answer = await apiPost(data_gt)
        .then((answer) => {
            try {
                return json_parsing(answer);
            } catch {
                return json_parsing(answer + "}");
            }
        })
        .catch((err) => {
            console.log(err);
            alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
        });
    printAnswer_gt(answer);
    data_gt.pop();
    $loading.classList.add("hide");
});

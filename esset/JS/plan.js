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
        content: `assistant는 여행계획을 만들어주는 전문가이다.`,
    },
    {
        role: "system",
        content:
            "여행계획의 정보는 여행지, 여행지에 도착하는날과 시간, 여행이 끝나는 날과 시간, 그 외의 여행조건 이 주어질것이다. 그 외의 여행 조건은 없을수도 있다. 없으면 자유롭게 여행계획을 만들면 된다. 그 외의 여행조건이 있다면, 가능한한 여행계획에 반영 해야 한다. 추가적인 요구사항은 절대로 없으니까 주어진 정보만 이용해서 자유로운 여행계획을 만들면 된다. 추가적인 질문은 금지된다. 주어진 정보로만 여행계획을 만들어야한다.",
    },
    {
        role: "system",
        content: `일정을 만들때는 특별한 조건이 없다면, 가용한 시간을 고려해서 따라서 아침식사, 오전일정, 점심식사, 오후일정, 저녁식사, 야간일정 으로 짜야한다. 식사 일정을 만들때는 추천 메뉴를 함께 적어야 한다. 거리와 시간을 고려해서 일정을 짜야한다. 일정 내부에서는 ' 를 사용해선 안된다. 곧바로 전체의 일정을 짜면 된다. 일정을 짤때 중요한건 1. 일정은 여행지에 도착하는 시간 이후부터 만들어야 한다는 것. 2. 여행이 끝나는 날에는 여행이 끝나는 시간 이후에 일정은 만들어서는 안된다는것. 3. 하루의 일정은 6개 근방으로 할것. 이다. 이 조건을 반드시 준수해서 일정을 만들어야한다.
        `,
    },
    {
        role: "system",
        content: `답변 형식: {"$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["시작시간:분  = 세부일정", "시작시간:분 = 세부일정" ]"}, "$일차" : {"날짜":"$일차($년 $월 $일, $요일)", "일정":"["시작시간:분  = 세부일정", "시작시간:분 = 세부일정" ]"} }.`,
    },
    {
        role: "system",
        content: `답변 형식이 정확한지 한번 확인해보고, 정확하게 고쳐서 반환할것. 일정안의 시작시간:분 = 세부일정 에서 =을 다른걸로 교체하지 말것. 고치는 과정은 반환할 필요 없음.`,
    },
];

// 질문 양식 정리
const createQuestion = (_) => {
    const target = $target.value;
    const start_date = $start_date.value.split("T");
    const end_date = $end_date.value.split("T");
    const extra_condition = $extra_condition.value;
    if (extra_condition == undefined) {
        return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]} 이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 이걸 바탕으로 여행계획을 만들어줘.`;
    }
    return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]}이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 다음과 같아.${extra_condition}. 이걸 바탕으로 여행계획을 만들어줘.`;
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
        const card = make_box("div", "card");
        const label = make_item("div", data["날짜"], "date");
        for (const plan of data["일정"]) {
            const row = make_box("div", "plan_box");
            const plan_data = plan.split("=");
            const col_time = make_item("div", plan_data[0].trim(), "time");
            const col_plan = make_item("div", plan_data[1].trim(), "plan");
            row.append(col_time, col_plan);
            card.append(row);
        }
        card.prepend(label);
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

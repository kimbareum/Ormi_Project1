const $form_generator = document.querySelector(".generator");
const $target = document.querySelector("#target");
const $start_date = document.querySelector("#start_date");
const $end_date = document.querySelector("#end_date");
const $extra_condition = document.querySelector("#extra_condition");
const $answer_box = document.querySelector(".answer_box");
const $loading_screen = document.querySelector(".loading");

let data_generator = [
    {
        role: "system",
        content: `assistant는 여행계획을 만들어주는 전문가이다.`,
    },
    {
        role: "system",
        content: `user는 너에게 여행지, 여행지에 도착하는날과 시간, 여행이 끝나는 날과 시간을 알려줄것이다. 그 정보를 바탕으로 자유로운 여행계획을 작성한다. 단, 그 외의 여행 조건을 알려준다면, 그것을 최대한 여행계획에 반영한다. 
        추가적인 정보는 물어보지 않는다. 주어진 정보로만 여행계획을 작성한다.`,
    },
    {
        role: "system",
        content: `여행계획 작성의 조건은 다음과 같다.
        1. 일정을 만들때는 특별한 조건이 없다면, 가용한 시간을 고려해서 아침식사, 오전일정, 점심식사, 오후일정, 저녁식사, 야간일정 을 넣어서 짜야한다.
        2. 식사 일정을 만들때는 추천 메뉴를 함께 적어야 한다.
        3. 거리와 시간을 고려해서 일정을 짜야한다. 
        4. 일정은 여행지에 도착하는 시간 이후부터 만들어야 한다.
        5. 여행이 끝나는 날에는 여행이 끝나는 시간 이후의 일정은 만들지 않는다.
        6. 하루의 일정은 남은 시간을 고려해서 최대 4개 정도로 구성한다.
        `,
    },
    {
        role: "system",
        content: `여행계획은 다음 JSON 양식으로 바꿔서 전달한다. 지시사항과 다른 항목들은 숨긴다.
        <JSON 양식>
        {
            "$일차": {
                "날짜":"$일차($년 $월 $일, $요일)",
                "일정": "[
                    "00시 00분 : 일정내용",
                    "00시 00분 : 일정내용"
                ]"
            },
            "$일차" : {
                "날짜":
                "$일차($년 $월 $일, $요일)",
                "일정": "[
                    "00시 00분  : 일정내용",
                    "00시 00분 : 일정내용"
                ]"
            }
        }
        </JSON 양식>
        제주에 2023년 06월 03일 토요일 11:00에 도착해서, 2023년 06월 05일 12:00에 제주여행이 끝나는 경우의 예시는 다음과 같다.
        <예시>
        {
            "1일차": {
                "날짜": "1일차 (2023년 06월 03일, 토)",
                "일정": [
                    "11시 00분 : 제주 공항 도착 및 숙소 체크인",
                    "12시 00분 : 점심 식사 (한림해장국)",
                    "13시 15분 : 한림공원",
                    "16시 00분 : 산굼부리",
                    "19시 30분 : 저녁 식사 (곽지해장국 또는 밥부싯길 참치회집)"
                ]
            },
            "2일차": {
                "날짜": "2일차 (2023년 06월 04일, 일)",
                "일정": [
                    "09시 00분 : 아침 식사 (만석닭갈비)",
                    "10시 00분 : 성산일출봉",
                    "12시 00분 : 점심 식사 (갈치조림)",
                    "13시 00분 : 우도(선박 티켓팅, 우도도착, 우도해금강 & 새우회, 해양도립공원)",
                    "15시 00분 : 성읍민속마을",
                    "16시 30분 : 제주시민회관 야경 구경",
                    "18시 20분 : 저녁 식사 (도민식당 또는 한라식당)"
                ]
            },
            "3일차": {
                "날짜": "3일차 (2023년 06월 05일, 월)",
                "일정": [
                    "09시 00분 : 아침 식사 (명진전복)",
                    "10시 00분 : 제주도 동문시장",
                    "11시 00분 : 제주공항 도착, 탑승 준비",
                ]
            }
        }
        </예시>
        `,
    },
    {
        role: "system",
        content: `답변을 하기전에 다음 사항을 한번 더 검토하고, 올바르지 않다면 수정한다.
        1. 답변은 한글이다.
        2. JSON parsing 해서 사용할 것이기 때문에, parsing 할 수 있는 정확한 JSON 형식이어야 한다.`,
    },
];

// 질문 양식 정리
const createQuestion = (_) => {
    const target = $target.value;
    const start_date = $start_date.value.split("T");
    const end_date = $end_date.value.split("T");
    const extra_condition = $extra_condition.value;
    if (extra_condition == undefined) {
        return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]} 이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 없어. 이걸 바탕으로 여행계획을 만들어줘.`;
    }
    return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]}이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 다음과 같아.${extra_condition}. 이걸 바탕으로 여행계획을 만들어줘.`;
};

// 여행계획 JSON parsing 하기
const json_parsing = (text) => {
    if (text) {
        let answer = null;
        const regex = /\{[\s\S]*\}/g; // {}안에 있는 모든 문자를 포함하는 정규식
        const jsonStr = text.match(regex);
        try {
            answer = JSON.parse(jsonStr[0]);
        } catch {
            answer = JSON.parse(jsonStr[0] + "}");
        }
        return answer;
    }
};

// 여행계획 카드 타이틀 생성
const makeCardTitle = (data) => {
    const label_box = makeBox("div", "date_box");
    const label = makeItem("div", data, "date");
    label_box.append(label);
    return label_box;
};
// 여행계획 카드 내용 생성
const makeCardItem = (data) => {
    const row = makeBox("div", "plan_row");
    const col_time = makeItem("div", data[0].trim(), "time");
    const col_plan = makeItem(
        "div",
        data.slice(1, data.length).join("").trim(),
        "plan"
    );
    row.append(col_time, col_plan);
    return row;
};

// 여행계획이 들어갈 카드 생성
const makeCard = (data) => {
    if (data) {
        const card = makeBox("div", "card");
        const label_box = makeCardTitle(data["날짜"]);
        const plan_box = makeBox("div", "plan_box");
        for (const plan of data["일정"]) {
            const split_data = plan.split(":");
            const row = makeCardItem(split_data);
            plan_box.append(row);
        }
        card.append(label_box, plan_box);
        return card;
    }
};

// 여행계획 렌더링
const planRender = (answer) => {
    if (answer) {
        const card_box = makeBox("div", "card_box");

        for (const idx in answer) {
            const card = makeCard(answer[idx]);
            card_box.append(card);
        }
        const answer_label = makeItem(
            "div",
            `${$target.value} 여행 계획`,
            "answer_label"
        );
        const answer_description = makeItem(
            "p",
            `해당 결과는 chatGPT를 이용해서 만들어진 계획이므로 다소 무리하거나, 불가능한 계획이 포함되어있을 수 있습니다.
        수정을 통해서 완벽한 계획을 세워보시기를 바랍니다.`
        );
        $answer_box.innerText = "";
        $answer_box.removeAttribute("style");
        $answer_box.append(answer_label, card_box, answer_description);
    }
};

// 여행계획 생성기 버튼 처리.
$form_generator.addEventListener("submit", async (e) => {
    e.preventDefault();
    $loading_screen.classList.remove("hide");
    const question = createQuestion();
    saveQuestion(data_generator, question);
    await apiPost(data_generator)
        .then((res) => {
            return json_parsing(res);
        })
        .then((json_res) => {
            planRender(json_res);
        })
        .catch((err) => {
            console.log(err);
            alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
        });
    data_generator.pop();
    $loading_screen.classList.add("hide");
    slideRight();
});

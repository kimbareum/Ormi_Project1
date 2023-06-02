import OpenAiApi from "./open_ai_api.js";
import { makeBox, makeItem } from "../utils/dom_func.js";
import { slideLeft, slideRight } from "../utils/slide.js";

export default class PlanGenerator extends OpenAiApi {
    constructor(data) {
        super(data);
        this.data = data;
        this.$form = document.querySelector(".generator");
        this.$target = document.querySelector("#target");
        this.$start_date = document.querySelector("#start_date");
        this.$end_date = document.querySelector("#end_date");
        this.$extra_condition = document.querySelector("#extra_condition");
        this.$answer_box = document.querySelector(".answer_box");
        this.$loading_screen = document.querySelector(".loading");
        this.addButtonEvent();
    }

    addButtonEvent() {
        this.$form.addEventListener("submit", async (e) => {
            e.preventDefault();
            this.$loading_screen.classList.remove("hide");

            const question = this.createQuestion();
            this.saveQuestion(question);
            await this.apiPost(this.data)
                .then((res) => {
                    return this.json_parsing(res);
                })
                .then((json_res) => {
                    this.planRender(json_res);
                })
                .then(() => {
                    slideRight();
                })
                .catch((err) => {
                    console.log(err);
                    alert(
                        "죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요."
                    );
                    slideLeft();
                });
            this.data.pop();
            this.$loading_screen.classList.add("hide");
        });
    }

    createQuestion() {
        const target = this.$target.value;
        const start_date = this.$start_date.value.split("T");
        const end_date = this.$end_date.value.split("T");
        const extra_condition = this.$extra_condition.value;
        if (extra_condition == "") {
            return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]} 이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 없어. 이걸 바탕으로 여행계획을 만들어줘.`;
        }
        return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]}이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 다음과 같아.${extra_condition}. 이걸 바탕으로 여행계획을 만들어줘.`;
    }

    json_parsing(text) {
        if (text) {
            let answer = null;
            const regex = /\{[\s\S]*\}/g; // {}안에 있는 모든 문자를 포함하는 정규식
            const jsonStr = text.match(regex);
            try {
                answer = JSON.parse(jsonStr[0]);
            } catch {
                answer = JSON.parse(jsonStr[1]);
            }
            return answer;
        }
    }

    // 여행계획 카드 타이틀 생성
    makeCardTitle(data) {
        const label_box = makeBox("div", "date_box");
        const label = makeItem("div", data, "date");
        label_box.append(label);
        return label_box;
    }
    // 여행계획 카드 내용 생성
    makeCardItem(data) {
        const row = makeBox("div", "plan_row");
        const col_time = makeItem("div", data[0].trim(), "time");
        const col_plan = makeItem(
            "div",
            data.slice(1, data.length).join("").trim(),
            "plan"
        );
        row.append(col_time, col_plan);
        return row;
    }
    // 여행계획이 들어갈 카드 생성
    makeCard(data) {
        if (data) {
            const card = makeBox("div", "card");
            const label_box = this.makeCardTitle(data["날짜"]);
            const plan_box = makeBox("div", "plan_box");
            for (const plan of data["일정"]) {
                const split_data = plan.split(":");
                const row = this.makeCardItem(split_data);
                plan_box.append(row);
            }
            card.append(label_box, plan_box);
            return card;
        }
    }

    planRender(answer) {
        if (answer) {
            const card_box = makeBox("div", "card_box");

            for (const idx in answer) {
                const card = this.makeCard(answer[idx]);
                card_box.append(card);
            }
            const answer_label = makeItem(
                "div",
                `${this.$target.value} 여행 계획`,
                "answer_label"
            );
            const answer_description = makeItem(
                "p",
                `해당 결과는 chatGPT를 이용해서 만들어진 계획이므로 다소 무리하거나, 불가능한 계획이 포함되어있을 수 있습니다.
            수정을 통해서 완벽한 계획을 세워보시기를 바랍니다.`
            );
            this.$answer_box.innerText = "";
            this.$answer_box.removeAttribute("style");
            this.$answer_box.append(answer_label, card_box, answer_description);
        }
    }
}

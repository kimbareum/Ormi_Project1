import {
    generator_data as data,
    plan_data as plan,
} from "../../../data/api_data.js";
import { saveQuestion } from "../../../utils/data_record.js";

import Target from "./form/Target.js";
import StartDate from "./form/StartDate.js";
import EndDate from "./form/EndDate.js";
import Extra from "./form/Extra.js";

export default class GeneratorForm {
    constructor({ $panel, getState }) {
        this.state = { busy: false };

        // form내 input
        this.target = new Target({ $panel });
        this.start_date = new StartDate({ $panel });
        this.end_date = new EndDate({ $panel });
        this.extra = new Extra({ $panel });

        const button_box = document.createElement("div");
        button_box.className = "gen-button";
        this.submit_button = document.createElement("button");
        this.submit_button.type = "submit";
        this.submit_button.innerText = "생성";
        this.reset_button = document.createElement("button");
        this.reset_button.type = "reset";
        this.reset_button.innerText = "리셋";

        button_box.append(this.submit_button, this.reset_button);
        $panel.append(button_box);

        this.sendState = getState;

        this.panel = $panel;
        this.setEvent();
    }

    setState(newState) {
        this.state = newState;
    }

    setEvent() {
        this.panel.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleQuestion();
        });
    }

    handleQuestion() {
        // 답변을 대기중인 상태면 중단.
        if (!this.state.busy) {
            const target = this.target.getValue();
            const question = this.createQuestion();

            // 질문과 타겟 외부에 저장
            saveQuestion(data, question);
            plan.target = target;

            this.setState({ busy: true });
            this.sendState({ busy: true });
        }
    }

    createQuestion() {
        const target = this.target.getValue();
        const start_date = this.start_date.getValue().split("T");
        const end_date = this.end_date.getValue().split("T");
        const extra = this.extra.getValue();
        if (extra == "") {
            return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]} 이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 없어. 이걸 바탕으로 여행계획을 만들어줘.`;
        }
        return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]}이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 다음과 같아. ${extra}. 이걸 바탕으로 여행계획을 만들어줘.`;
    }
}

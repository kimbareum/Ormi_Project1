import {
    generator_data as data,
    plan_data as plan,
} from "../../../data/api_data.js";
import { saveQuestion } from "../../../utils/data_record.js";
import Button from "../../common/button.js";
import Input from "../../common/Input.js";
import { makeLabelBox } from "../../../utils/dom_box.js";

export default class GeneratorForm {
    constructor({ $panel, getState }) {
        this.state = { busy: false };

        /* form내 input과 label 생성 */
        // box 생성하고 내부에 label 생성
        const target_box = makeLabelBox({
            boxTag: "div",
            boxClass: "gen-input",
            labelFor: "target",
            labelText: "어디로 떠나고 싶으신가요?",
        });
        // input 생성하고 box에 append
        this.target = new Input({
            $target: target_box,
            type: "search",
            id: "target",
            option: { required: "", placeholder: "여행지를 입력하세요." },
        });
        const start_date_box = makeLabelBox({
            boxTag: "div",
            boxClass: "gen-input",
            labelFor: "start-date",
            labelText: "언제 여행지에 도착하세요?",
        });
        this.start_date = new Input({
            $target: start_date_box,
            type: "datetime-local",
            id: "start-date",
            option: { required: "" },
        });
        const end_date_box = makeLabelBox({
            boxTag: "div",
            boxClass: "gen-input",
            labelFor: "end-date",
            labelText: "여행지를 떠나는 시간은 언제인가요?",
        });
        this.end_date = new Input({
            $target: end_date_box,
            type: "datetime-local",
            id: "end-date",
            option: { required: "" },
        });
        const extra_box = makeLabelBox({
            boxTag: "div",
            boxClass: "gen-input",
            labelFor: "extra-condition",
            labelText: "여행의 특이사항이 있을까요?",
        });
        this.extra = new Input({
            $target: extra_box,
            type: "textarea",
            id: "extra-condition",
            option: {
                placeholder:
                    "꼭 들리고 싶은 관광지나 여행의 조건등을 자유롭게 작성해주세요. 조건을 문장단위로 끊어서 적으면 더 정확한 결과를 얻을 수 있습니다.",
                cols: "20",
                rows: "5",
            },
        });
        // 패널에 input 추가.
        $panel.append(target_box, start_date_box, end_date_box, extra_box);

        // form 내 버튼 생성.
        const button_box = document.createElement("div");
        button_box.className = "gen-button";
        $panel.append(button_box);

        this.submit_button = new Button({
            $target: button_box,
            type: "submit",
            text: "생성",
        });
        this.reset_button = new Button({
            $target: button_box,
            type: "reset",
            text: "리셋",
        });

        // 하위 컴포턴트 상태 받아오기.
        this.sendState = getState;

        // 패널을 이벤트에서 사용할것이기 때문에 this로 받고 이벤트 세팅
        this.panel = $panel;
        this.setEvent();
    }

    setState(newState) {
        this.state = newState;
    }

    setEvent() {
        // submit 이벤트
        this.panel.addEventListener("submit", (e) => {
            e.preventDefault();
            this.handleQuestion();
        });
        // enter키 입력 이벤트
        this.extra.setEvent({
            eventType: "enter",
            event: this.handleQuestion,
        });
    }

    handleQuestion = () => {
        // 상태가 busy 라면(api응답을 대기중인 상태면) 중단.
        if (!this.state.busy) {
            const target = this.target.getValue();
            const start_date = this.start_date.getValue().split("T");
            const end_date = this.end_date.getValue().split("T");
            if (!!target || !!start_date || !!end_date) {
                return;
            }
            const extra = this.extra.getValue();
            // 답변 양식 전처리.
            const question = this.createQuestion(
                target,
                start_date,
                end_date,
                extra
            );

            // 질문과 타겟을 데이터에 저장
            saveQuestion(data, question);
            plan.target = target;

            this.setState({ busy: true });
            this.sendState({ busy: true });
        }
    };
    // 답변 양식 전처리
    createQuestion(target, start_date, end_date, extra) {
        if (extra == "") {
            return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]} 이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 없어. 이걸 바탕으로 여행계획을 만들어줘.`;
        }
        return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]}이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 다음과 같아. ${extra}. 이걸 바탕으로 여행계획을 만들어줘.`;
    }
}

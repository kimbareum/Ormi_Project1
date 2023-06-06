import { generatorData as data } from "../../../data/api_data.js";
import { saveQuestion } from "../../../utils/data_record.js";
import Button from "../../common/button.js";
import Input from "../../common/Input.js";
import { makeTextBox, makeLabelBox } from "../../common/common_box.js";

export default class GeneratorForm {
    constructor({ $panel, getState }) {
        this.state = { busy: false };

        /* form내 input과 label 생성 */
        // box 생성하고 내부에 label 생성
        this.targetBox = makeLabelBox({
            boxTag: "div",
            boxClass: "gen-input",
            labelFor: "target",
            labelText: "어디로 떠나고 싶으신가요?",
        });
        // input 생성하고 box에 append
        this.target = new Input({
            $target: this.targetBox,
            type: "search",
            id: "target",
            option: { placeholder: "여행지를 입력하세요." },
        });
        this.startDateBox = makeLabelBox({
            boxTag: "div",
            boxClass: "gen-input",
            labelFor: "start-date",
            labelText: "언제 여행지에 도착하세요?",
        });
        this.startDate = new Input({
            $target: this.startDateBox,
            type: "datetime-local",
            id: "start-date",
        });
        this.endDateBox = makeLabelBox({
            boxTag: "div",
            boxClass: "gen-input",
            labelFor: "end-date",
            labelText: "여행지를 떠나는 시간은 언제인가요?",
        });
        this.endDate = new Input({
            $target: this.endDateBox,
            type: "datetime-local",
            id: "end-date",
        });
        this.extraBox = makeLabelBox({
            boxTag: "div",
            boxClass: "gen-input",
            labelFor: "extra-condition",
            labelText: "여행의 특이사항이 있을까요?",
        });
        this.extra = new Input({
            $target: this.extraBox,
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
        $panel.append(
            this.targetBox,
            this.startDateBox,
            this.endDateBox,
            this.extraBox
        );

        // form 내 버튼 생성.
        const buttonBox = document.createElement("div");
        buttonBox.className = "gen-button";
        $panel.append(buttonBox);

        this.submitButton = new Button({
            $target: buttonBox,
            type: "submit",
            text: "생성",
        });
        this.resetButton = new Button({
            $target: buttonBox,
            type: "reset",
            text: "리셋",
        });

        // 하위 컴포턴트 상태 받아오기.
        this.sendState = getState;

        // 패널을 이벤트에서 사용할것이기 때문에 this로 받고 이벤트 세팅
        this.$panel = $panel;
        this.setEvent();
    }

    setState(newState) {
        this.state = newState;
    }

    setEvent() {
        // submit 이벤트
        this.$panel.addEventListener("submit", (e) => {
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
            const startDate = this.startDate.getValue();
            const endDate = this.endDate.getValue();
            const extra = this.extra.getValue();

            //답변의 유효성 검증
            if (this.checkValidation(target, startDate, endDate)) {
                // 답변 양식 전처리.
                const question = this.createQuestion(
                    target,
                    startDate,
                    endDate,
                    extra
                );

                // 질문과 타겟을 데이터에 저장
                saveQuestion(data, question);
                localStorage.setItem("newTarget", target);

                this.setState({ busy: true });
                this.sendState({ busy: true });
            }
        }
    };

    // 입력 form 유효성 검증
    checkValidation(target, startDate, endDate) {
        // 각각의 필수 데이터가 없을때
        if (!target) {
            this.target.focus();
            this.noticeValidInfo({
                target: this.targetBox,
                text: "여행지를 입력해 주세요.",
            });
            return false;
        }
        if (!startDate) {
            this.startDate.focus();
            this.noticeValidInfo({
                target: this.startDateBox,
                text: "여행지에 도착하는 시간을 입력해 주세요.",
            });
            return false;
        }
        if (!endDate) {
            this.endDate.focus();
            this.noticeValidInfo({
                target: this.endDateBox,
                text: "여행지를 떠나는 시간을 입력해 주세요.",
            });
            return false;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();
        // 여행 시작 시간이 현재보다 빠르거나 여행이 끝나는 시간이 시작하는 시간보다 빠를 때
        if (start.getTime() - now.getTime() < 0) {
            this.startDate.focus();
            this.noticeValidInfo({
                target: this.startDateBox,
                text: "유효하지 않은 시간입니다.",
            });
            return false;
        }
        if (end.getTime() - start.getTime() < 0) {
            this.endDate.focus();
            this.noticeValidInfo({
                target: this.endDateBox,
                text: "유효하지 않은 시간입니다.",
            });
            return false;
        }
        // 유효성 검증 통과
        return true;
    }
    // 유효성 검증 실패시 버튼 아래에 메세지 출력
    noticeValidInfo({ target, text }) {
        // info box
        const notice = makeTextBox({
            boxTag: "div",
            boxClass: "notice",
            text: text,
        });
        target.append(notice);
        // 생성 1초후 삭제
        setTimeout(() => target.removeChild(notice), 1500);
    }

    // 답변 양식 전처리
    createQuestion(target, startDate, endDate, extra) {
        const [startDay, startTime] = startDate.split("T");
        const [endDay, endTime] = endDate.split("T");
        if (extra == "") {
            return `${target} 여행을 떠날거야. 여행 시작일은 ${startDay} 이고, 여행지에 도착하는 시간은 ${startTime}야. 여행이 끝나는 날은 ${endDay} 이고, 이 날의 ${endTime}에 여행지를 떠나야해. 그 외의 여행 조건은 없어. 이걸 바탕으로 여행계획을 만들어줘.`;
        }
        return `${target} 여행을 떠날거야. 여행 시작일은 ${startDay}이고, 여행지에 도착하는 시간은 ${startTime}야. 여행이 끝나는 날은 ${endDay} 이고, 이 날의 ${endTime}에 여행지를 떠나야해. 그 외의 여행 조건은 다음과 같아. ${extra}. 이걸 바탕으로 여행계획을 만들어줘.`;
    }
}
import CardBox from "./CardBox.js";
import { makeBox, makeTextBox } from "../../common/common_box.js";

export default class PlanBox {
    constructor({ $screen }) {
        // plan을 표시할 box를 생성
        const planBox = makeBox({
            boxTag: "div",
            boxClass: "plan-box",
        });
        $screen.append(planBox);
        // plan box의 제목 생성
        this.planLabel = makeBox({
            boxTag: "h3",
            boxClass: "plan-label",
        });
        planBox.append(this.planLabel);

        // plan box 내부에 card들이 표시될 card box 생성
        this.cardBox = new CardBox({ $planBox: planBox });

        // plan box 내부에 주의사항 생성.
        const planDescription = makeTextBox({
            boxTag: "p",
            text: `해당 결과는 chatGPT를 이용해서 만들어진 계획이므로 다소 무리하거나, 불가능한 계획이 포함되어있을 수 있습니다.
            수정을 통해서 완벽한 계획을 세워보시기를 바랍니다.`,
        });
        planBox.append(planDescription);

        this.render(true);
    }

    render(init) {
        const isCorrect = localStorage.getItem("isCorrect");
        const target = localStorage.getItem("target");
        // localStorage에 데이터가 없다면 박스를 초기화.
        if (!target) {
            this.cardBox.clear();
            return;
        }
        // localStarage에 데이터가 있고 양식이 유효하다면 렌더링 시작.
        if (isCorrect === "true" || init) {
            this.planLabel.innerText = `${target} 여행 계획`;
            this.cardBox.render();
        }
    }
}

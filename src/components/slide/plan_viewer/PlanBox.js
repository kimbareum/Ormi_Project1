import CardBox from "./CardBox.js";
import { makeBox, makeTextBox } from "../../common/commonBoxes.js";

/** 여행계획의 렌더링을 담당한다. */
export default class PlanBox {
    constructor({ $target }) {
        // plan을 표시할 box를 생성
        const planBox = makeBox({
            boxTag: "div",
            boxClass: "plan-box",
        });
        $target.append(planBox);
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
            text: `해당 결과는 chatGPT를 이용해서 만들어진 계획이므로 다소 무리하거나, 불가능한 계획이 포함되어 있을 수 있습니다. 수정을 통해서 완벽한 계획을 세워보시기를 바랍니다.`,
        });
        planBox.append(planDescription);

        this.render();
    }

    render() {
        const target = localStorage.getItem("target");
        const isCorrect = localStorage.getItem("isCorrect");
        // localStorage에 데이터가 없다면 박스를 초기화.
        if (!target) {
            this.cardBox.clear();
            return;
        }
        if (!isCorrect) {
            return;
        }
        this.planLabel.innerText = `${target} 여행 계획`;
        this.cardBox.render();
    }
}

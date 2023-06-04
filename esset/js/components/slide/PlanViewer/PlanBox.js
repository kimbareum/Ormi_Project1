import CardBox from "./CardBox.js";

export default class PlanBox {
    constructor({ $screen }) {
        this.state = null;
        const plan_box = document.createElement("div");
        plan_box.className = "plan-box";
        $screen.append(plan_box);

        this.plan_label = document.createElement("div");
        this.plan_label.className = "plan-label";
        plan_box.append(this.plan_label);

        this.cardBox = new CardBox({ $plan_box: plan_box });

        const answer_description = document.createElement("p");
        answer_description.innerText = `해당 결과는 chatGPT를 이용해서 만들어진 계획이므로 다소 무리하거나, 불가능한 계획이 포함되어있을 수 있습니다.
        수정을 통해서 완벽한 계획을 세워보시기를 바랍니다.`;
        plan_box.append(answer_description);
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        this.plan_label.innerText = `${this.state.target} 여행 계획`;
        this.cardBox.setState(this.state.answer);
    }
}

import CardBox from "./CardBox.js";

export default class PlanBox {
    constructor({ $screen }) {
        this.data = null;
        this.$plan_box = document.createElement("div");
        this.$plan_box.className = "plan-box";
        $screen.append(this.$plan_box);

        this.plan_label = document.createElement("div");
        this.plan_label.className = "plan-label";
        this.$plan_box.append(this.plan_label);

        this.cardBox = new CardBox({ $plan_box: this.$plan_box });

        const answer_description = document.createElement("p");
        answer_description.innerText = `해당 결과는 chatGPT를 이용해서 만들어진 계획이므로 다소 무리하거나, 불가능한 계획이 포함되어있을 수 있습니다.
        수정을 통해서 완벽한 계획을 세워보시기를 바랍니다.`;
        this.$plan_box.append(answer_description);
    }

    setData(newData) {
        this.data = newData;
        this.render();
    }

    render() {
        this.plan_label.innerText = this.data.target;
        this.cardBox.setData(this.data.answer);
    }
}

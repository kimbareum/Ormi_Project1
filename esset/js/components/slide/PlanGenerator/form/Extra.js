export default class Extra {
    constructor({ $panel }) {
        const extra_box = document.createElement("div");
        extra_box.className = "gen-input";
        $panel.append(extra_box);

        this.extra = document.createElement("textarea");
        this.extra.id = "extra_condition";
        this.extra.placeholder =
            "꼭 들리고 싶은 관광지나 여행의 조건등을 자유롭게 작성해주세요. 조건을 문장단위로 끊어서 적으면 더 정확한 결과를 얻을 수 있습니다.";
        this.extra.cols = "20";
        this.extra.rows = "5";
        const extra_label = document.createElement("label");
        extra_label.setAttribute("for", "extra_condition");
        extra_label.innerText = "여행의 특이사항이 있을까요?";
        extra_box.append(extra_label, this.extra);
    }

    getValue() {
        return this.extra.value;
    }
}

export default class Target {
    constructor({ $panel }) {
        const target_box = document.createElement("div");
        target_box.className = "gen-input";
        $panel.append(target_box);

        this.target = document.createElement("input");
        this.target.type = "search";
        this.target.id = "target";
        this.target.placeholder = "여행지를 입력하세요.";
        this.target.setAttribute("required", "");
        const target_label = document.createElement("label");
        target_label.setAttribute("for", "target");
        target_label.innerText = "어디로 떠나고 싶으신가요?";
        target_box.append(target_label, this.target);
    }

    getValue() {
        return this.target.value;
    }
}

export default class StartDate {
    constructor({ $panel }) {
        const start_date_box = document.createElement("div");
        start_date_box.className = "gen-input";
        $panel.append(start_date_box);

        this.start_date = document.createElement("input");
        this.start_date.type = "datetime-local";
        this.start_date.id = "start_date";
        this.start_date.setAttribute("required", "");
        const start_date_label = document.createElement("label");
        start_date_label.setAttribute("for", "start_date");
        start_date_label.innerText = "언제 여행지에 도착하세요?";
        start_date_box.append(start_date_label, this.start_date);
    }

    getValue() {
        return this.start_date.value;
    }
}

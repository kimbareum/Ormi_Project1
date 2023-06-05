export default class EndDate {
    constructor({ $panel }) {
        const end_date_box = document.createElement("div");
        end_date_box.className = "gen-input";
        this.end_date = document.createElement("input");
        this.end_date.type = "datetime-local";
        this.end_date.id = "end_date";
        this.end_date.setAttribute("required", "");
        const end_date_label = document.createElement("label");
        end_date_label.setAttribute("for", "end_date");
        end_date_label.innerText = "여행지를 떠나는 시간은 언제인가요?";
        end_date_box.append(end_date_label, this.end_date);
        $panel.append(end_date_box);
    }

    getValue() {
        return this.end_date.value;
    }
}

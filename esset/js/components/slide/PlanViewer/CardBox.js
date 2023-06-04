export default class CardBox {
    constructor({ $plan_box }) {
        this.data = null;

        this.card_box = document.createElement("div");
        this.card_box.className = "card-box";
        $plan_box.append(this.card_box);

        // empty
        this.card_box.innerHTML = `<div style="padding: 300px 0 300px 0"> 여행계획이 아직 생성되지 않았습니다.</div>`;
    }

    setState(newData) {
        this.data = newData;
        this.render();
    }

    render() {
        this.card_box.innerHTML = "";

        const plans = this.data;
        for (const idx in plans) {
            const card = this.makeCard(plans[idx]);
            this.card_box.append(card);
        }
    }

    makeCard(data) {
        if (data) {
            const card = document.createElement("div");
            card.className = "card";

            const label_box = document.createElement("div");
            label_box.className = "card-label-row";
            const label = document.createElement("div");
            label.className = "card-label";
            label.innerText = data["날짜"];
            label_box.append(label);

            const detail_box = document.createElement("ul");
            detail_box.className = "card-detail";
            for (const plan of data["일정"]) {
                const split_data = plan.split(":");

                const row = document.createElement("li");
                row.className = "card-row";

                const col_time = document.createElement("div");
                col_time.className = "time";
                col_time.innerText = split_data[0].trim();

                const col_detail = document.createElement("div");
                col_detail.className = "detail";
                col_detail.innerText = split_data[1].trim();

                row.append(col_time, col_detail);
                detail_box.append(row);
            }

            card.append(label_box, detail_box);
            return card;
        }
    }
}

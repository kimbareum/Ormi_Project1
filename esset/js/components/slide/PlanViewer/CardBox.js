import { plan_data as plan } from "../../../data/api_data.js";
import { makeBox, makeTextBox } from "../../../utils/dom_box.js";

export default class CardBox {
    constructor({ $plan_box }) {
        // card box 생성
        this.card_box = makeBox({
            boxTag: "div",
            boxClass: "card-box",
        });
        $plan_box.append(this.card_box);

        // card box 초기화
        this.card_box.innerHTML = `<div style="padding: 300px 0 300px 0"> 여행계획이 아직 생성되지 않았습니다.</div>`;
    }

    render() {
        // card box의 내용을 비워서 렌더링 준비.
        this.card_box.innerHTML = "";

        // 응답의 내용을 저장.
        const plans = plan.responce;
        for (const idx in plans) {
            // 일차마다 card를 한장씩 생성
            const card = this.makeCard(plans[idx]);
            this.card_box.append(card);
        }
    }

    makeCard(data) {
        if (data) {
            // card 한장의 box 생성.
            const card = makeBox({
                boxTag: "div",
                boxClass: "card",
            });
            // card의 제목 box 생성.
            const label_box = makeBox({
                boxTag: "div",
                boxClass: "card-label-row",
            });
            // card의 제목 추가.
            const label = makeTextBox({
                boxTag: "div",
                boxClass: "card-label",
                text: data["날짜"],
            });
            label_box.append(label);

            // card의 세부일정 박스 생성.
            const detail_box = makeBox({
                boxTag: "ul",
                boxClass: "card-detail",
            });
            for (const plan of data["일정"]) {
                // 세부일정을 시간과 일정내용으로 분리
                const split_data = plan.split(":");

                // card의 각 row를 생성
                const row = makeBox({
                    baxTag: "li",
                    boxClass: "card-row",
                });
                // card row에 시간 column 생성
                const col_time = makeTextBox({
                    boxTag: "div",
                    boxClass: "time",
                    text: split_data[0].trim(),
                });
                // card row에 일정 column 생성
                const col_detail = makeTextBox({
                    boxTag: "div",
                    boxClass: "detail",
                    text: split_data[1].trim(),
                });

                row.append(col_time, col_detail);
                detail_box.append(row);
            }

            card.append(label_box, detail_box);
            return card;
        }
    }
}

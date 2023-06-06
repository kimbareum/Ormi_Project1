import { generatorData as data } from "../../../data/api_data.js";
import apiPost from "../../../utils/open_ai_api.js";

export default class GeneratorApi {
    constructor({ getState }) {
        this.state = { busy: false };
        // PlanGenerator로 state 전달.
        this.sendState = getState;
    }

    setState(newState) {
        this.state = newState;
        this.getAnswer();
    }

    // 응답값 전처리1 : JSON 스트링만 뽑아내서 parsing
    jsonParsing(text) {
        if (text) {
            let result = null;
            const regex = /\{[\s\S]*\}/g;
            const jsonStr = text.match(regex);
            result = JSON.parse(jsonStr[0]);

            return result;
        }
    }

    // 응답값 전처리2 : 유효한 양식인지 검사
    validation(data) {
        for (const idx in data) {
            for (const plan of data[idx]["일정"]) {
                const hasColon = plan.includes(":");
                if (!hasColon) {
                    throw new Error("일정에 ':' 가 없음.");
                }
            }
        }
    }

    async getAnswer() {
        await apiPost(data)
            .then((res) => {
                // 응답값 전처리1: json 데이터만 꺼내서 파싱
                return this.jsonParsing(res);
            })
            .then((answer) => {
                // 응답값 전처리2: 유효한 양식인지 검사
                this.validation(answer);
                return answer;
            })
            .then((answer) => {
                // 응답이 왔고 올바른 응답이었음을 plan data에 기록.
                localStorage.setItem("plans", JSON.stringify(answer));
                localStorage.setItem("isCorrect", true);
                const target = localStorage.getItem("newTarget");
                localStorage.setItem("target", target);
            })
            .catch((err) => {
                // 올바르지 않은 응답이었음을 plan data에 기록.
                localStorage.setItem("isCorrect", false);
                console.log(err);
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
        // 앞서 전송했던 질문을 제거.
        data.pop();
        // planGenerator에게 !busy state 전달.
        this.sendState({ busy: false });
    }
}

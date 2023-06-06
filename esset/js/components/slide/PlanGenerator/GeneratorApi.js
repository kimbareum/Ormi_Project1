import {
    generatorData as data,
    planData as plan,
} from "../../../data/api_data.js";
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

    // 응답값 전처리
    jsonParsing(text) {
        if (text) {
            let result = null;
            const regex = /\{[\s\S]*\}/g;
            const jsonStr = text.match(regex);
            result = JSON.parse(jsonStr[0]);

            return result;
        }
    }

    async getAnswer() {
        await apiPost(data)
            .then((res) => {
                // 응답값 전처리
                return this.jsonParsing(res);
            })
            .then((answer) => {
                // 응답이 왔고 올바른 응답이었음을 plan data에 기록.
                plan.responce = answer;
                plan.isCorrect = true;
            })
            .catch((err) => {
                // 올바르지 않은 응답이었음을 plan data에 기록.
                plan.isCorrect = false;
                console.log(err);
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
        // 앞서 전송했던 질문을 제거.
        data.pop();
        // planGenerator에게 !busy state 전달.
        this.sendState({ busy: false });
    }
}

import {
    generator_data as data,
    plan_data as plan,
} from "../../../data/api_data.js";
import apiPost from "../../../utils/open_ai_api.js";

export default class GeneratorApi {
    constructor({ getState }) {
        this.state = { busy: false };

        this.sendState = getState;
    }

    setState(newState) {
        this.state = newState;
        this.getAnswer();
    }

    json_parsing(text) {
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
                return this.json_parsing(res);
            })
            .then((answer) => {
                plan.responce = answer;
                plan.isCorrect = true;
            })
            .catch((err) => {
                plan.isCorrect = false;
                console.log(err);
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
        data.pop();
        this.sendState({ busy: false });
    }
}

import { data_generator as data } from "../../../data/api_data.js";
import apiPost from "../../../utils/open_ai_api.js";

export default class GeneratorApi {
    constructor({ getState }) {
        this.state = { busy: false, target: "", answer: "" };

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
                this.sendState({
                    ...this.state,
                    busy: false,
                    answer: answer,
                });
            })
            .catch((err) => {
                this.sendState({
                    ...this.state,
                    busy: false,
                    answer: "fail",
                });
                console.log(err);
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
        data.pop();
    }
}

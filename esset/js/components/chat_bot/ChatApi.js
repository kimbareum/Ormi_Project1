import apiPost from "../../utils/open_ai_api.js";
import { saveAnswer } from "../../utils/data_record.js";
import { data_chatbot as data } from "../../data/api_data.js";

export default class ChatApi {
    constructor({ getState }) {
        this.sendState = getState;
    }

    async getAnswer() {
        await apiPost(data)
            .then((res) => {
                saveAnswer(data, res);
                this.sendState({
                    busy: false,
                });
            })
            .catch((err) => {
                this.sendState({
                    busy: false,
                });
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
    }
}

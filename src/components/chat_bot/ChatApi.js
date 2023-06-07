import apiPost from "../../api/open_ai_api.js";
import { saveAnswer } from "../../utils/data_record.js";
import { chatbotData as data } from "../../data/api_data.js";

export default class ChatApi {
    constructor({ getState }) {
        // ChatBot으로 state 전달.
        this.sendState = getState;
    }
    // 챗봇의 질문을 API로 전송
    async getAnswer() {
        await apiPost(data)
            .then((res) => {
                // data에 답변을 저장
                saveAnswer(data, res);
                // chatbot의 state를 busy에서 !busy(챗봇api응답을 받았음)로 변경.
                this.sendState({
                    busy: false,
                });
            })
            .catch((err) => {
                this.sendState({
                    busy: false,
                });
            });
    }
}

import apiPost from "../../api/openAIApi.js";
import { saveAnswer } from "../../api/dataRecord.js";
import { chatbotData as data } from "../../data/apiData.js";

/** 챗봇의 API응답과 응답의 처리를 담당한다 */
export default class ChatApi {
    constructor({ getState }) {
        // ChatBot으로 state 전달.
        this.sendState = getState;
    }
    /** API 요청을 보낸 후 응답을 chatbotData에 저장한다. */
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
            .catch(() => {
                this.sendState({
                    busy: false,
                });
            });
    }
}

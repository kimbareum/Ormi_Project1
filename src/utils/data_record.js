/**
 * 전해진 질문을 opneAI API 요청 양식에 맞춰서 저장한다.
 * @param {Object} data 질문을 저장할 곳.
 * @param {*} question 질문의 내용.
 */
export const saveQuestion = (data, question) => {
    if (question) {
        data.push({
            role: "user",
            content: question,
        });
    }
};
/**
 * opneAI API 응답을 양식에 맞춰서 저장한다.
 * @param {Object} data API의 답변을 저장할 곳.
 * @param {*} answer API 답변의 내용.
 */
export const saveAnswer = (data, answer) => {
    if (answer) {
        data.push({
            role: "assistant",
            content: answer,
        });
    }
};

export const saveQuestion = (data, question) => {
    if (question) {
        data.push({
            role: "user",
            content: question,
        });
    }
};

export const saveAnswer = (data, answer) => {
    if (answer) {
        data.push({
            role: "assistant",
            content: answer,
        });
    }
};

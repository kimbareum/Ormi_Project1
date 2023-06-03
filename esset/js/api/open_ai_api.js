const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

export const apiPost = async (data) => {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        redirect: "follow",
    })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const text = res.choices[0].message.content;
            console.log(text);
            return text;
        })
        .catch((err) => {
            return err;
        });
};

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

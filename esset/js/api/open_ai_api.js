export default class OpenAIApi {
    constructor(data) {
        this.data = data;
        this.url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;
    }

    apiPost = async (data) => {
        return await fetch(this.url, {
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

    saveQuestion = (question) => {
        if (question) {
            this.data.push({
                role: "user",
                content: question,
            });
        }
    };

    saveAnswer = (answer) => {
        if (answer) {
            this.data.push({
                role: "assistant",
                content: answer,
            });
        }
    };
}

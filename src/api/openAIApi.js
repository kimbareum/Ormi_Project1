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
            return text;
        })
        .catch(() => {
            throw new Error("API error");
        });
};

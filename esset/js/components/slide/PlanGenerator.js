import apiPost from "../../utils/open_ai_api.js";
import { saveQuestion } from "../../utils/data_record.js";
import { data_generator as data } from "../../data/api_data.js";
import LoadingScreen from "./PlanGenerator/LoadingScreen.js";
import Target from "./PlanGenerator/form/Target.js";
import StartDate from "./PlanGenerator/form/StartDate.js";
import EndDate from "./PlanGenerator/form/EndDate.js";
import Extra from "./PlanGenerator/form/Extra.js";

export default class PlanGenerator {
    constructor({ $slide, getReponce }) {
        this.state = { loading: false, question: "", answer: "", target: "" };

        const $window = document.createElement("section");
        $window.classList.add("slide-generator", "slide-item");
        $window.setAttribute("view", "one");
        $slide.append($window);

        const $panel = document.createElement("form");
        $panel.setAttribute("action", "post");
        $panel.className = "generator";
        $window.append($panel);

        const label = document.createElement("h2");
        label.className = "gen-label";
        const label_img = document.createElement("img");
        label_img.src = "./esset/img/generator_label.png";
        label_img.alt = "여행계획 생성기";
        label.append(label_img);

        const generator_notice = document.createElement("p");
        generator_notice.className = "gen-notice";
        generator_notice.innerText =
            "chatGPT를 활용해서 여러분들의 여행계획을 자동으로 짜드립니다. 우측하단의 챗봇을 통해 여행관련 질문도 자유롭게 해주세요!";

        $panel.append(label, generator_notice);

        this.target = new Target({ $panel });
        this.start_date = new StartDate({ $panel });
        this.end_date = new EndDate({ $panel });
        this.extra = new Extra({ $panel });

        const button_box = document.createElement("div");
        button_box.className = "gen-button";
        const submit_button = document.createElement("button");
        submit_button.type = "submit";
        submit_button.innerText = "생성";
        const reset_button = document.createElement("button");
        reset_button.type = "reset";
        reset_button.innerText = "리셋";

        button_box.append(submit_button, reset_button);
        $panel.append(button_box);

        this.loadingScreen = new LoadingScreen({ $panel });

        this.sendResponce = getReponce;

        this.setEvent($panel, submit_button);
    }

    setState(newState) {
        this.state = newState;
        this.render();
        this.action();
    }

    render() {
        this.loadingScreen.setState(this.state.loading);
    }

    action() {
        if (this.state.answer == "fail") {
            return;
        }
        if (this.state.loading) {
            saveQuestion(data, this.state.question);
            this.getResponce();
        } else {
            this.sendResponce({
                answer: this.state.answer,
                target: this.state.target,
            });
        }
    }

    setEvent($panel, submit_button) {
        $panel.addEventListener("submit", (e) => {
            e.preventDefault();
            this.setState({
                loading: true,
                question: this.createQuestion(),
                answer: "",
                target: "",
            });
        });

        submit_button.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.key == "Enter") {
                return;
            } else if (e.key == "Enter") {
                e.preventDefault();
                this.setState({
                    loading: true,
                    question: this.createQuestion(),
                    answer: "",
                    target: "",
                });
            }
        });
    }

    createQuestion() {
        const target = this.target.getValue();
        const start_date = this.start_date.getValue().split("T");
        const end_date = this.end_date.getValue().split("T");
        const extra = this.extra.getValue();
        if (extra == "") {
            return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]} 이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 없어. 이걸 바탕으로 여행계획을 만들어줘.`;
        }
        return `${target} 여행을 떠날거야. 여행 시작일은 ${start_date[0]}이고, 여행지에 도착하는 시간은 ${start_date[1]}야. 여행이 끝나는 날은 ${end_date[0]} 이고, 이 날의 ${end_date[1]}에 여행지를 떠나야해. 그 외의 여행 조건은 다음과 같아.${extra_condition}. 이걸 바탕으로 여행계획을 만들어줘.`;
    }

    json_parsing(text) {
        if (text) {
            let result = null;
            const regex = /\{[\s\S]*\}/g; // {}안에 있는 모든 문자를 포함하는 정규식
            const jsonStr = text.match(regex);
            result = JSON.parse(jsonStr[0]);

            return result;
        }
    }

    async getResponce() {
        await apiPost(data)
            .then((res) => {
                return this.json_parsing(res);
            })
            .then((answer) => {
                this.setState({
                    loading: false,
                    question: "",
                    answer: answer,
                    target: this.target.getValue(),
                });
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    question: "",
                    answer: "fail",
                    target: "",
                });
                console.log(err);
                alert("죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.");
            });
    }
}

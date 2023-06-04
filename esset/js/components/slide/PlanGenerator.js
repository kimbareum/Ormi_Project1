import img_src from "../../data/img_data.js";

import LoadingScreen from "./PlanGenerator/LoadingScreen.js";
import GeneratorForm from "./PlanGenerator/GeneratorForm.js";
import GeneratorApi from "./PlanGenerator/GeneratorApi.js";

export default class PlanGenerator {
    constructor({ $slide, getState }) {
        this.state = { busy: false };

        const window = document.createElement("section");
        window.classList.add("slide-generator", "slide-item");
        window.setAttribute("view", "one");
        $slide.append(window);

        const panel = document.createElement("form");
        panel.setAttribute("action", "post");
        panel.className = "generator";
        window.append(panel);

        const label = document.createElement("h2");
        label.className = "gen-label";
        const label_img = document.createElement("img");
        label_img.src = img_src.generator_label;
        label_img.alt = "여행계획 생성기";
        label.append(label_img);

        const generator_notice = document.createElement("p");
        generator_notice.className = "gen-notice";
        generator_notice.innerText =
            "chatGPT를 활용해서 여러분들의 여행계획을 자동으로 짜드립니다. 우측하단의 챗봇을 통해 여행관련 질문도 자유롭게 해주세요!";

        panel.append(label, generator_notice);

        this.genForm = new GeneratorForm({
            $panel: panel,
            getState: this.getState,
        });

        this.genApi = new GeneratorApi({ getState: this.getState });

        this.loadingScreen = new LoadingScreen({ $panel: panel });

        this.sendState = getState;
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        // 로딩스크린 토글
        this.loadingScreen.setState(this.state);

        if (this.state.busy) {
            this.genApi.setState(this.state);
        } else {
            this.sendState({ render: true });
        }
        // form 입력 다시 가능하게
        this.genForm.setState(this.state);
    }

    getState = (newState) => {
        this.setState(newState);
    };
}

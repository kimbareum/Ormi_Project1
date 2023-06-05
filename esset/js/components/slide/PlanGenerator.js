import img_src from "../../data/img_data.js";
import { makeBox } from "../../utils/dom_box.js";

import LoadingScreen from "./PlanGenerator/LoadingScreen.js";
import GeneratorForm from "./PlanGenerator/GeneratorForm.js";
import GeneratorApi from "./PlanGenerator/GeneratorApi.js";

export default class PlanGenerator {
    constructor({ $slide, getState }) {
        this.state = { busy: false };

        // 여행계획 생성기 section 생성
        const window = makeBox({
            boxTag: "section",
            boxClass: ["slide-generator", "slide-item"],
        });
        // 현재 페이지를 one으로 설정.
        window.setAttribute("view", "one");
        $slide.append(window);

        // 여행계획 생성기 form 생성.
        const panel = makeBox({
            boxTag: "form",
            boxClass: "generator",
        });
        panel.setAttribute("action", "post");
        window.append(panel);

        // 여행계획 생성기 제목 과 설명 생성
        const label = `
        <h2 class="gen-label"><img src="${img_src.generator_label}" alt="여행계획 생성기"></h2>`;
        const generator_notice = `
        <p class="gen-notice">chatGPT를 활용해서 여러분들의 여행계획을 자동으로 짜드립니다. 우측하단의 챗봇을 통해 여행관련 질문도 자유롭게 해주세요!</p>`;

        panel.innerHTML = label + generator_notice;

        // form 을 다루는 컴포넌트 생성.
        this.genForm = new GeneratorForm({
            $panel: panel,
            getState: this.getState,
        });

        // 여행계획생성기의 Api 응답을 다루는 컴포넌트 생성.
        this.genApi = new GeneratorApi({ getState: this.getState });

        // 여행계획생성기 로딩스크린 컴포넌트 생성.
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
            // state가 busy 라면(api 응답을 받아야 하는 상태) api 호출
            this.genApi.setState(this.state);
        } else {
            // state가 busy가 아니라면(api 응답을 받은 상태) Slide 컴포넌트에게 렌더링하라는 state 전송.
            this.sendState({ render: true });
        }
        // genForm 입력 다시 가능하게 state 전송.
        this.genForm.setState(this.state);
    }

    getState = (newState) => {
        this.setState(newState);
    };
}

import img_src from "../../data/img_data.js";
import { makeBox } from "../common/common_box.js";

import LoadingScreen from "./plan_generator/LoadingScreen.js";
import AlertModal from "../common/alert_modal.js";
import GeneratorForm from "./plan_generator/GeneratorForm.js";
import GeneratorApi from "./plan_generator/GeneratorApi.js";
import Footer from "./plan_generator/Footer.js";

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
        const generatorNotice = `
        <p class="gen-notice">chatGPT를 활용해서 여러분들의 여행계획을 자동으로 짜드립니다. 우측하단의 챗봇을 통해 여행관련 질문도 자유롭게 해주세요!</p>`;

        panel.innerHTML = label + generatorNotice;

        // form 을 다루는 컴포넌트 생성.
        this.genForm = new GeneratorForm({
            $panel: panel,
            getState: this.getState,
        });

        // 여행계획생성기의 Api 응답을 다루는 컴포넌트 생성.
        this.genApi = new GeneratorApi({ getState: this.getState });

        // 여행계획생성기 로딩스크린 컴포넌트 생성.
        this.loadingScreen = new LoadingScreen({ $panel: panel });

        this.alertModal = new AlertModal({
            $target: window,
            text: "죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.",
        });

        // 여행계획생성기 푸터 생성.
        this.footer = new Footer({ $target: window });

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
            // state가 busy가 아닐때(api 응답을 받은 상태)
            if (localStorage.getItem("isCorrect") === "true") {
                // 응답이 정상적이었다면 planviewer에 render 요청
                this.sendState({ render: true });
            } else {
                // 응답이 비정상적이었다면 alertModal render
                this.alertModal.show();
            }
        }
        // genForm 입력 다시 가능하게 state 전송.
        this.genForm.setState(this.state);
    }

    getState = (newState) => {
        this.setState(newState);
    };
}
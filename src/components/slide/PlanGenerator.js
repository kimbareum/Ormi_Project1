import { makeBox } from "../common/commonBoxes.js";

import { LoadingScreen } from "../common/LoadingScreen.js";
import { AlertModal } from "../common/AlertModal.js";
import { GeneratorForm } from "./plan_generator/GeneratorForm.js";
import { GeneratorApi } from "./plan_generator/GeneratorApi.js";

/** section1 여행계획생성기 */
export class PlanGenerator {
    /** section1 여행계획생성기 */
    constructor({ $target, getState }) {
        this.state = { busy: false };

        // 여행계획 생성기 form 생성.
        const panel = makeBox({
            boxTag: "form",
            boxClass: "generator",
        });
        panel.setAttribute("action", "post");
        $target.append(panel);

        // 여행계획 생성기 제목과 설명 생성
        const label = `
        <h2 class="gen-label" aria-label="여행계획 생성기"><div></div></h2>`;
        const generatorNotice = `
        <p class="gen-notice">chatGPT를 활용해서 여러분들의 여행계획을 자동으로 짜드립니다. 우측하단의 챗봇을 통해 여행관련 질문도 자유롭게 해주세요!</p>`;

        panel.innerHTML = label + generatorNotice;

        // form 을 다루는 컴포넌트 생성.
        this.genForm = new GeneratorForm({
            $target: panel,
            getState: this.getState,
        });

        // 여행계획생성기의 Api 응답을 다루는 컴포넌트 생성.
        this.genApi = new GeneratorApi({ getState: this.getState });

        // 여행계획생성기 로딩스크린 컴포넌트 생성.
        this.loadingScreen = new LoadingScreen({
            $target: panel,
            text: "여행의 조건에 따라서 약 1~2분 정도의 시간이 소요됩니다.",
        });

        this.alertModal = new AlertModal({
            $target: $target,
            text: "죄송합니다! 오류가 발생했어요. 다시 한번 시도해주세요.",
        });

        this.sendState = getState;
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    render() {
        if (this.state.busy) {
            this.loadingScreen.show();
            // state가 busy 라면(api 응답을 받아야 하는 상태) api 호출
            this.genApi.getAnswer();
        } else {
            this.loadingScreen.hide();
            // state가 busy가 아닐때(api 응답을 받은 상태)
            if (localStorage.getItem("isCorrect") === "true") {
                // 응답이 정상적이었다면 slide state를 render : true로
                this.sendState({ render: true });
            } else {
                // 응답이 비정상적이었다면
                // alertModal 렌더링
                this.alertModal.show();
                // slide state를 render : false로
                this.sendState({ render: false });
            }
        }
        // genForm 입력 다시 가능하게 state 전송.
        this.genForm.setState(this.state);
    }

    /** 하위컴포넌트의 state를 상위컴포넌트로 전송한다. */
    getState = (newState) => {
        this.setState(newState);
    };
}

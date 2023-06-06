import PlanBox from "./PlanViewer/PlanBox.js";
import img_src from "../../data/img_data.js";
import { makeBox } from "../common/dom_box.js";

export default class PlanViewer {
    constructor({ $slide }) {
        // 여행계획 뷰어 section 생성
        const window = makeBox({
            boxTag: "section",
            boxClass: ["slide-viewer", "slide-item"],
        });
        // 현재 페이지를 one으로 설정.
        window.setAttribute("view", "one");
        $slide.append(window);

        // 여행계획 뷰어 내부 컨테이너 생성.
        const screen = makeBox({
            boxTag: "div",
            boxClass: "viewer-screen",
        });
        window.append(screen);

        // 여행계획 뷰어 제목 생성
        const label = `
        <h2 class="viewer-label"><img src="${img_src.viewer_label}" alt="여행계획 뷰어"></h2>`;
        screen.innerHTML = label;

        // 여행계획을 표시할 컴포넌트 생성
        this.planBox = new PlanBox({ $screen: screen });
    }

    render() {
        this.planBox.render();
    }
}

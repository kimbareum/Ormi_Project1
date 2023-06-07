import PlanBox from "./plan_viewer/PlanBox.js";
import IMG_SRC from "../../data/imgPaths.js";
import { makeBox } from "../common/commonBoxes.js";

/** section2 여행계획 뷰어 */
export default class PlanViewer {
    /** section2 여행계획 뷰어 */
    constructor({ $target }) {
        // 여행계획 뷰어 section 생성
        const window = makeBox({
            boxTag: "section",
            boxClass: ["slide-viewer", "slide-item"],
        });
        // 현재 페이지를 one으로 설정.
        window.setAttribute("view", "one");
        $target.append(window);

        // 여행계획 뷰어 내부 컨테이너 생성.
        const screen = makeBox({
            boxTag: "div",
            boxClass: "viewer-screen",
        });
        window.append(screen);

        // 여행계획 뷰어 제목 생성
        const label = `
        <h2 class="viewer-label"><img src="${IMG_SRC.viewer_label}" alt="여행계획 뷰어"></h2>`;
        screen.innerHTML = label;

        // 여행계획을 표시할 컴포넌트 생성
        this.planBox = new PlanBox({ $target: screen });
    }

    render() {
        this.planBox.render();
    }
}

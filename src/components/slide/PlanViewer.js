import PlanBox from "./plan_viewer/PlanBox.js";
import { makeBox } from "../common/commonBoxes.js";

/** section2 여행계획 뷰어 */
export default class PlanViewer {
    /** section2 여행계획 뷰어 */
    constructor({ $target }) {
        // 여행계획 뷰어 내부 컨테이너 생성.
        const screen = makeBox({
            boxTag: "div",
            boxClass: "viewer-screen",
        });
        $target.append(screen);

        // 여행계획 뷰어 제목 생성
        const label = `
        <h2 class="viewer-label" aria-label="여행계획 뷰어"><div></div></h2>`;
        screen.innerHTML = label;

        // 여행계획을 표시할 컴포넌트 생성
        this.planBox = new PlanBox({ $target: screen });
    }

    render() {
        this.planBox.render();
    }
}

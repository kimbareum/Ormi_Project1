import PlanGenerator from "./slide/PlanGenerator.js";
import PlanViewer from "./slide/PlanViewer.js";
import { makeBox } from "./common/commonBoxes.js";
import SlideControl from "./slide/slideControl.js";

/** main 여행계획 생성기 */
export default class Slide {
    constructor($target) {
        this.state = { render: false };

        // 페이지의 main 태그 생성.
        this.slide = document.createElement("main");
        $target.append(this.slide);

        // 슬라이드 전환 이벤트를 위해 slide 목록을 저장.
        this.slideItems = [];

        // 여행계획 생성을 담당하는 컴포넌트 생성.
        const planGeneratorWindow = makeBox({
            boxTag: "section",
            boxClass: ["slide-generator", "slide-item"],
        });
        this.PlanGenerator = this.createSlideItem(
            PlanGenerator,
            planGeneratorWindow
        );

        // 여행계획의 렌더링을 담당하는 컴포넌트 생성.
        const planViewerWindow = makeBox({
            boxTag: "section",
            boxClass: ["slide-viewer", "slide-item"],
        });
        this.planViewer = this.createSlideItem(PlanViewer, planViewerWindow);

        this.slideControl = new SlideControl({
            slide: this.slide,
            slideItems: this.slideItems,
        });

        // 초기화
        this.slide.append(this.slideItems[0]);
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        // 여행계획 생성기에서 state render:true가 오면 여행계획 뷰어에게 렌더링 명령.
        if (this.state.render) {
            this.planViewer.render();
            // 슬라이드를 1로 변경.
            this.slideChange.setSlide(1);
        } else {
            // 여행계획 생성기에서 state render:false가 오면 api응답에 실패했다는 뜻이므로 슬라이드를 0으로 변경.
            this.slideChange.setSlide(0);
        }
    }

    /** 하위 컴포넌트의 데이터를 받아온다 */
    getState = (newState) => {
        this.setState(newState);
    };

    /** 슬라이드내의 각각의 슬라이드를 생성하고 슬라이드 리스트에 추가함. */
    createSlideItem(Component, target) {
        const slide = new Component({
            $target: target,
            getState: this.getState,
        });
        this.slideItems.push(target);
        return slide;
    }
}

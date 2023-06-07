import PlanGenerator from "./slide/PlanGenerator.js";
import PlanViewer from "./slide/PlanViewer.js";

/** main 여행계획 생성기 */
export default class Slide {
    constructor($target) {
        this.state = { render: false };
        this.page = "one";

        // 페이지의 main 태그 생성.
        this.slide = document.createElement("main");
        $target.append(this.slide);

        // 여행계획 생성을 담당하는 컴포넌트 생성.
        this.planGenerator = new PlanGenerator({
            $target: this.slide,
            getState: this.getState,
        });

        // 여행계획의 렌더링을 담당하는 컴포넌트 생성.
        this.planViewer = new PlanViewer({ $target: this.slide });

        // 슬라이드 전환 이벤트를 위해 노드 선택.
        this.slideItems = document.querySelectorAll(".slide-item");
        this.slideButton = document.querySelector(".slide-button");

        this.setEvent();
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        // 여행계획 생성기에서 state render:true가 오면 여행계획 뷰어에게 렌더링 명령.
        if (this.state.render) {
            this.planViewer.render();
            // 슬라이드를 2로 변경.
            this.setPage("two");
        } else {
            // 여행계획 생성기에서 state render:false가 오면 api응답에 실패했다는 뜻이므로 슬라이드를 1로 변경.
            this.setPage("one");
        }
    }

    /** 하위 컴포넌트의 데이터 받아온다 */
    getState = (newState) => {
        this.setState(newState);
    };

    /**
     * 슬라이드를 전환한다.
     * @param {"one"|"two"} 전환할 페이지.
     */
    setPage(newPage) {
        if (this.page === newPage) {
            return;
        }
        const newView = this.page === "one" ? "two" : "one";
        this.slideItems.forEach((item) => {
            item.setAttribute("view", newView);
        });
        this.page = newPage;
    }

    // 페이지 전환 이벤트들 추가.
    setEvent() {
        // 슬라이드 버튼 이벤트
        this.slideButton.addEventListener("click", () => {
            this.slideItems[0].getAttribute("view") === "one"
                ? this.setPage("two")
                : this.setPage("one");
        });

        // 드래그 이벤트
        this.slide.addEventListener("mousedown", (e) => {
            this.handleDragStart(e.pageX, e.pageY);
        });

        this.slide.addEventListener("mouseup", (e) => {
            this.handleDragEnd(e.pageX, e.pageY, "drag");
        });

        // 스와이프 이벤트
        this.slide.addEventListener("touchstart", (e) => {
            this.handleDragStart(e.touches[0].pageX, e.touches[0].pageY);
        });

        this.slide.addEventListener("touchend", (e) => {
            this.handleDragEnd(
                e.changedTouches[0].pageX,
                e.changedTouches[0].pageY,
                "swipe"
            );
        });
    }

    /** 드래그 or 스와이프 시작시 좌표를 저장한다. */
    handleDragStart(startX, startY) {
        this.startPointX = startX;
        this.startPointY = startY;
    }

    /** 드래그 or 스와이프 종료시 둘 사이의 좌표의 차이에 따라서 슬라이드를 좌우로 전환한다. */
    handleDragEnd(endX, endY, eventType) {
        const diffX = endX - this.startPointX;
        const diffY = endY - this.startPointY;

        const thresholdX = eventType === "drag" ? 300 : 90;
        const thresholdY = eventType === "drag" ? 150 : 100;
        // Y 방향으로 일정거리 이상 움직이면 중단.
        if (Math.abs(diffY) >= thresholdY) {
            return;
        }
        // 조건에 따라서 슬라이드 전환.
        if (diffX > 0 && diffX >= thresholdX) {
            this.setPage("one");
        } else if (diffX < 0 && Math.abs(diffX) >= thresholdX) {
            this.setPage("two");
        }
    }
}

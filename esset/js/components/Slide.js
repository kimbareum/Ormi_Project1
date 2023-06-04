import PlanGenerator from "./slide/PlanGenerator.js";
import PlanViewer from "./slide/PlanViewer.js";

// main
export default class Slide {
    constructor($target) {
        this.state = { render: false };
        this.page = "one";

        this.slide = document.createElement("main");
        $target.append(this.slide);

        this.planGenerator = new PlanGenerator({
            $slide: this.slide,
            getState: this.getState,
        });

        this.planViewer = new PlanViewer({ $slide: this.slide });

        this.slideItems = document.querySelectorAll(".slide-item");
        this.slideButton = document.querySelector(".slide-button");

        this.setEvent();
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        if (this.state.render) {
            this.planViewer.render();
            this.setPage("two");
        }
    }

    // 하위 컴포넌트 데이터 받아오기
    getState = (newState) => {
        this.setState(newState);
    };

    // 페이지전환 메서드.
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
        this.slideButton.addEventListener("click", () => {
            this.slideItems[0].getAttribute("view") === "one"
                ? this.setPage("two")
                : this.setPage("one");
        });

        this.slide.addEventListener("mousedown", (e) => {
            this.handleDragStart(e.pageX, e.pageY);
        });

        this.slide.addEventListener("mouseup", (e) => {
            this.handleDragEnd(e.pageX, e.pageY, "drag");
        });

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

    handleDragStart(startX, startY) {
        this.startPointX = startX;
        this.startPointY = startY;
    }

    handleDragEnd(endX, endY, eventType) {
        const diffX = endX - this.startPointX;
        const diffY = endY - this.startPointY;

        const thresholdX = eventType === "drag" ? 300 : 90;
        const thresholdY = eventType === "drag" ? 150 : 100;
        if (Math.abs(diffY) >= thresholdY) {
            return;
        }
        if (diffX > 0 && diffX >= thresholdX) {
            this.setPage("one");
        } else if (diffX < 0 && Math.abs(diffX) >= thresholdX) {
            this.setPage("two");
        }
    }
}

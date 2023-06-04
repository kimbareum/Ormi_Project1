import PlanGenerator from "./slide/PlanGenerator.js";
import PlanViewer from "./slide/PlanViewer.js";

export default class Slide {
    constructor($target) {
        this.data = { answer: "", target: "" };
        this.page = "one";

        const $slide = document.createElement("main");
        $target.append($slide);

        this.planGenerator = new PlanGenerator({
            $slide,
            getReponce: this.getReponce,
        });

        this.planViewer = new PlanViewer({ $slide });

        this.slideItems = document.querySelectorAll(".slide-item");
        const slideButton = document.querySelector(".slide-button");

        this.setEvent(slideButton, $slide);
    }

    setState(newData) {
        this.data = newData;
        this.render();
    }

    render() {
        this.planViewer.setState(this.data);
        this.setPage("two");
    }

    setPage(newPage) {
        if (this.page === newPage) {
            return;
        } else {
            if (this.page === "one") {
                this.slideItems.forEach((i) => {
                    i.setAttribute("view", "two");
                });
            } else {
                this.slideItems.forEach((i) => {
                    i.setAttribute("view", "one");
                });
            }
        }
        this.page = newPage;
    }

    getReponce = (data) => {
        this.setState(data);
    };

    setEvent(slideButton, $slide) {
        let startPointX = 0;
        let startPointY = 0;
        let endPointX = 0;
        let endPointY = 0;

        slideButton.addEventListener("click", () => {
            this.slideItems[0].getAttribute("view") == "one"
                ? this.setPage("two")
                : this.setPage("one");
        });

        $slide.addEventListener("mousedown", (e) => {
            startPointX = e.pageX;
            startPointY = e.pageY;
        });

        $slide.addEventListener("mouseup", (e) => {
            endPointX = e.pageX;
            endPointY = e.pageY;
            if (Math.abs(startPointY - endPointY) >= 150) {
                return;
            }
            if (startPointX < endPointX && endPointX - startPointX >= 300) {
                this.setPage("one");
            } else if (
                startPointX > endPointX &&
                startPointX - endPointX >= 300
            ) {
                this.setPage("two");
            }
        });

        $slide.addEventListener("touchstart", (e) => {
            startPointX = e.touches[0].pageX;
            startPointY = e.touches[0].pageY;
        });

        $slide.addEventListener("touchend", (e) => {
            endPointX = e.changedTouches[0].pageX;
            endPointY = e.changedTouches[0].pageY;
            if (Math.abs(startPointY - endPointY) >= 100) {
                return;
            }
            if (startPointX < endPointX && endPointX - startPointX >= 90) {
                this.setPage("one");
            } else if (
                startPointX > endPointX &&
                startPointX - endPointX >= 90
            ) {
                this.setPage("two");
            }
        });
    }
}

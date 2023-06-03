import PlanGenerator from "./slide/PlanGenerator.js";
import PlanViewer from "./slide/PlanViewer.js";

export default class Slide {
    constructor($target) {
        this.data = { answer: "", target: "" };

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

    setState(page) {
        this.state = page;
        this.render();
    }

    render() {
        if (this.state == this.slideItems[0].getAttribute("view")) {
            return;
        } else {
            if (this.state == "one") {
                this.slideItems.forEach((i) => {
                    i.setAttribute("view", "one");
                });
            } else {
                this.slideItems.forEach((i) => {
                    i.setAttribute("view", "two");
                });
            }
        }
    }

    setData(newData) {
        this.data = newData;
        this.action();
        this.setState("two");
    }

    action() {
        this.planViewer.setData(this.data);
    }

    getReponce = (data) => {
        this.setData(data);
    };

    setEvent(slideButton, $slide) {
        let startPointX = 0;
        let startPointY = 0;
        let endPointX = 0;
        let endPointY = 0;

        slideButton.addEventListener("click", () => {
            this.slideItems[0].getAttribute("view") == "one"
                ? this.setState("two")
                : this.setState("one");
        });

        $slide.addEventListener("mousedown", (e) => {
            startPointX = e.pageX;
            startPointY = e.pageY;
        });

        $slide.addEventListener("mouseup", (e) => {
            endPointX = e.pageX;
            endPointY = e.pageY;
            if (Math.abs(startPointY - endPointY) >= 200) {
                return;
            }
            if (startPointX < endPointX && endPointX - startPointX >= 150) {
                this.setState("one");
            } else if (
                startPointX > endPointX &&
                startPointX - endPointX >= 150
            ) {
                this.setState("two");
            }
        });

        $slide.addEventListener("touchstart", (e) => {
            startPointX = e.touches[0].pageX;
            startPointY = e.touches[0].pageY;
        });

        $slide.addEventListener("touchend", (e) => {
            endPointX = e.touches[0].pageX;
            endPointY = e.touches[0].pageY;
            if (Math.abs(startPointY - endPointY) >= 100) {
                return;
            }
            if (startPointX < endPointX && endPointX - startPointX >= 80) {
                this.setState("one");
            } else if (
                startPointX > endPointX &&
                startPointX - endPointX >= 80
            ) {
                this.setState("two");
            }
        });
    }
}

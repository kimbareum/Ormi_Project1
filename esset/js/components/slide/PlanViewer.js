import PlanBox from "./PlanViewer/PlanBox.js";

export default class PlanViewer {
    constructor({ $slide }) {
        this.data = { answer: "", target: "" };
        const window = document.createElement("section");
        window.classList.add("slide-viewer", "slide-item");
        window.setAttribute("view", "one");
        $slide.append(window);

        const $screen = document.createElement("div");
        $screen.className = "viewer-screen";
        window.append($screen);

        const label = document.createElement("h2");
        label.clssName = "viewer-label";
        const label_img = document.createElement("img");
        label_img.src = "./esset/img/plan_label.png";
        label_img.alt = "여행계획 뷰어";
        label.append(label_img);
        $screen.append(label);

        this.plan = new PlanBox({ $screen });
    }

    setState(newData) {
        this.data = newData;
        this.render();
    }

    render() {
        this.plan.setState(this.data);
    }
}

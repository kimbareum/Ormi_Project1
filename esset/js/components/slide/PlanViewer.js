import PlanBox from "./PlanViewer/PlanBox.js";
import img_src from "../../data/img_data.js";

export default class PlanViewer {
    constructor({ $slide }) {
        this.state = { answer: "", target: "" };
        const window = document.createElement("section");
        window.classList.add("slide-viewer", "slide-item");
        window.setAttribute("view", "one");
        $slide.append(window);

        const screen = document.createElement("div");
        screen.className = "viewer-screen";
        window.append(screen);

        const label = document.createElement("h2");
        label.clssName = "viewer-label";
        const label_img = document.createElement("img");
        label_img.src = img_src.viewer_label;
        label_img.alt = "여행계획 뷰어";
        label.append(label_img);
        screen.append(label);

        this.plan = new PlanBox({ $screen: screen });
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        this.plan.setState(this.state);
    }
}

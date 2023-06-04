export default class LoadingScreen {
    constructor({ $panel }) {
        this.state = { busy: false };

        this.loading = document.createElement("loading-screen");
        this.loading.className = "hide";
        $panel.append(this.loading);

        const loading_description = document.createElement("div");
        loading_description.innerText =
            "여행의 조건에 따라서 긴 시간이 소요될 수 있습니다.";

        const loading_box = document.createElement("loading-bar");
        const loading_item1 = document.createElement("span");
        const loading_item2 = document.createElement("span");
        const loading_item3 = document.createElement("span");

        loading_box.append(loading_item1, loading_item2, loading_item3);
        this.loading.append(loading_description, loading_box);
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        if (this.state.busy) {
            this.loading.classList.remove("hide");
        } else {
            this.loading.classList.add("hide");
        }
    }
}

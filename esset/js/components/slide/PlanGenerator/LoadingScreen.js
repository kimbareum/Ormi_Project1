import { makeBox } from "../../common/common_box.js";

export default class LoadingScreen {
    constructor({ $panel }) {
        this.state = { busy: false };

        // 로딩스크린 박스 생성.
        this.loading = makeBox({
            boxTag: "loading-screen",
            boxClass: "hide",
        });
        $panel.append(this.loading);

        // 로딩스크린의 내용 생성.
        const loadingDescription = `
        <div>여행의 조건에 따라서 약 1~2분 정도의 시간이 소요됩니다.</div>`;
        const loadingBox = `<loading-bar><span></span><span></span><span></span></loading-bar>`;

        this.loading.innerHTML = loadingDescription + loadingBox;
    }

    setState(newState) {
        this.state = newState;
        this.render();
    }

    render() {
        if (this.state.busy) {
            // API 응답중 에는 로딩창 표시
            this.loading.classList.remove("hide");
        } else {
            // API 응답이 끝나면 로딩창 숨김
            this.loading.classList.add("hide");
        }
    }
}

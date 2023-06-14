/** 슬라이드의 표기 슬라이드를 제어한다 */
export class SlideControl {
    /**
     * 슬라이드의 표기 슬라이드를 제어한다
     * @param {object} option 슬라이드box와, 슬라이드 목록
     * @param {HTMLElement} option.slide 슬라이드 box
     * @param {Array} option.slideItems 슬라이드 목록
     */
    constructor({ slide, slideItems }) {
        this.page = 0;
        this.slide = slide;
        this.slideItems = slideItems;

        this.slideButton = this.slideButton =
            document.querySelector(".slide-button");

        this.setEvent();
    }

    /**
     * 슬라이드를 전환한다.
     * @param {0|1} 전환할 페이지.
     */
    setSlide(newPage) {
        // 현재페이지와 같다면 중단
        if (this.page === newPage) {
            return;
        }
        // 페이지의 이동방향에 따라서 다른 애니메이션 부여
        const direction = this.page < newPage ? "left" : "right";
        this.slideItems[this.page].classList.add(direction);

        // 애니메이션 재생시간인 150ms 이후에
        setTimeout(() => {
            // 애니메이션용 class 제거
            this.slideItems[this.page].classList.remove(direction);
            // 표기 슬라이드 변경
            this.slide.innerHTML = "";
            this.slide.append(this.slideItems[newPage]);
            this.page = newPage;
        }, 150);
    }

    // 페이지 전환 이벤트들 추가.
    setEvent() {
        // 슬라이드 버튼 이벤트
        this.slideButton.addEventListener("click", () => {
            this.page === 0 ? this.setSlide(1) : this.setSlide(0);
        });

        // 드래그 이벤트
        this.slide.addEventListener("mousedown", (e) => {
            this.dragStart(e.pageX, e.pageY);
        });

        this.slide.addEventListener("mouseup", (e) => {
            this.dragEnd(e.pageX, e.pageY, "drag");
        });

        // 스와이프 이벤트
        this.slide.addEventListener("touchstart", (e) => {
            this.dragStart(e.touches[0].pageX, e.touches[0].pageY);
        });

        this.slide.addEventListener("touchend", (e) => {
            this.dragEnd(
                e.changedTouches[0].pageX,
                e.changedTouches[0].pageY,
                "swipe"
            );
        });
    }

    /** 드래그 or 스와이프 시작시 좌표를 저장한다. */
    dragStart(startX, startY) {
        this.startPointX = startX;
        this.startPointY = startY;
    }

    /** 드래그 or 스와이프 종료시 둘 사이의 좌표의 차이에 따라서 슬라이드를 좌우로 전환한다. */
    dragEnd(endX, endY, eventType) {
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
            this.setSlide(0);
        } else if (diffX < 0 && Math.abs(diffX) >= thresholdX) {
            this.setSlide(1);
        }
    }
}

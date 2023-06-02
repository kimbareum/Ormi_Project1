const $slideItems = document.querySelectorAll(".slide_item");

export const slideLeft = (_) => {
    $slideItems.forEach((i) => {
        i.classList.remove("right");
    });
};

export const slideRight = (_) => {
    $slideItems.forEach((i) => {
        i.classList.add("right");
    });
};

export const slide = (_) => {
    if ($slideItems[0].classList.contains("right")) {
        slideLeft();
    } else {
        slideRight();
    }
};

export class Slide {
    constructor() {
        this.$slideButton = document.querySelector(".slide_button");
        this.$slide = document.querySelector(".slide");
        this.startPointX = 0;
        this.startPointY = 0;
        this.endPointX = 0;
        this.endPointY = 0;
        this.setButtonEvent();
        this.setDragEvent();
        this.setSwipeEvent();
    }

    setButtonEvent() {
        this.$slideButton.addEventListener("click", () => slide());
    }

    setDragEvent() {
        this.$slide.addEventListener("mousedown", (e) => {
            this.startPointX = e.pageX;
            this.startPointY = e.pageY;
        });
        this.$slide.addEventListener("mouseup", (e) => {
            this.endPointX = e.pageX;
            this.endPointY = e.pageY;
            // 복사를 위해 세로로 200px 이상 움직이면 슬라이드 안되게 설정.
            if (Math.abs(this.startPointY - this.endPointY) >= 200) {
                return;
            }
            if (
                this.startPointX < this.endPointX &&
                this.endPointX - this.startPointX >= 150
            ) {
                slideLeft();
            } else if (
                this.startPointX > this.endPointX &&
                this.startPointX - this.endPointX >= 150
            ) {
                slideRight();
            }
        });
    }

    setSwipeEvent() {
        this.$slide.addEventListener("touchstart", (e) => {
            this.startPointX = e.touches[0].pageX;
        });
        this.$slide.addEventListener("touchend", (e) => {
            this.endPointX = e.changedTouches[0].pageX;
            if (
                this.startPointX < this.endPointX &&
                this.endPointX - this.startPointX >= 80
            ) {
                slideLeft();
            } else if (
                this.startPointX > this.endPointX &&
                this.startPointX - this.endPointX >= 80
            ) {
                slideRight();
            }
        });
    }
}

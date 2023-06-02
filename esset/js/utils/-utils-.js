class Slide {
    constructor(target) {
        this.$slideItems = document.querySelectorAll(".slide_item");
    }

    left() {
        this.$slideItems.forEach((i) => {
            i.classList.remove("right");
        });
    }

    right() {
        this.$slideItems.forEach((i) => {
            i.classList.add("right");
        });
    }

    toggle() {
        if (this.$slideItems[0].classList.contains("right")) {
            this.left();
        } else {
            this.right();
        }
    }
}

class ButtonSlide extends Slide {
    setEvent() {
        this.target.addEventListener("click", () => this.slide());
    }
}

class DragSlide extends Slide {
    setEvent() {
        let startPointX;
        let startPointY;
        let endPointX;
        let endPointY;
        this.$slide.addEventListener("mousedown", (e) => {
            startPointX = e.pageX;
            startPointY = e.pageY;
        });
        this.$slide.addEventListener("mouseup", (e) => {
            endPointX = e.pageX;
            endPointY = e.pageY;
            // 복사를 위해 세로로 200px 이상 움직이면 슬라이드 안되게 설정.
            if (Math.abs(startPointY - endPointY) >= 200) {
                return;
            }
            if (startPointX < endPointX && endPointX - startPointX >= 150) {
                this.slideLeft();
            } else if (
                startPointX > endPointX &&
                startPointX - endPointX >= 150
            ) {
                this.slideRight();
            }
        });
    }
}

class SwipeSlide {
    setEvent() {
        let startPoint;
        let endPoint;
        this.$slide.addEventListener("touchstart", (e) => {
            startPoint = e.touches[0].pageX;
        });
        this.$slide.addEventListener("touchend", (e) => {
            endPoint = e.changedTouches[0].pageX;
            if (startPoint < endPoint && endPoint - startPoint >= 80) {
                slideLeft();
            } else if (startPoint > endPoint && startPoint - endPoint >= 80) {
                slideRight();
            }
        });
    }
}

new DragSlide();
new SwipeSlide();
new ButtonSlide(document.querySelector(".slide_button"));

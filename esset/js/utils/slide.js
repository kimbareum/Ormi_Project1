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

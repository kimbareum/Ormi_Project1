const makeBox = ({ boxTag, boxClass = [] }) => {
    const box = document.createElement(boxTag);
    const boxClassList = Array.isArray(boxClass) ? boxClass : [boxClass];
    box.classList.add(...boxClassList);
    return box;
};

const makeTextBox = ({ boxTag, boxClass = [], text }) => {
    const box = document.createElement(boxTag);
    const boxClassList = Array.isArray(boxClass) ? boxClass : [boxClass];
    box.classList.add(...boxClassList);
    box.innerText = text;
    return box;
};

const makeImgBox = ({ boxTag, boxClass = [], imgSrc, imgAlt = "" }) => {
    const box = document.createElement(boxTag);
    const boxClassList = Array.isArray(boxClass) ? boxClass : [boxClass];
    box.classList.add(...boxClassList);
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = imgAlt;
    box.append(img);
    return box;
};

const makeLabelBox = ({ boxTag, boxClass = [], labelFor, labelText }) => {
    const box = document.createElement(boxTag);
    const boxClassList = Array.isArray(boxClass) ? boxClass : [boxClass];
    box.classList.add(...boxClassList);
    const label = document.createElement("label");
    label.setAttribute("for", labelFor);
    label.innerText = labelText;
    box.append(label);
    return box;
};

export { makeBox, makeImgBox, makeLabelBox, makeTextBox };

/**
 * 내부가 비어있는 박스를 반환한다.
 * @param {Object} options 박스의 옵션.
 * @param {string} options.boxTag 박스의 HTML 태그.
 * @param {(null|string|string[])} options.boxClass 박스의 클래스.
 * @returns {HTMLElement} 생성된 박스 요소
 */
const makeBox = ({ boxTag, boxClass = [] }) => {
    const box = document.createElement(boxTag);
    const boxClassList = Array.isArray(boxClass) ? boxClass : [boxClass];
    box.classList.add(...boxClassList);
    return box;
};
/**
 * 내부에 text가 있는 박스를 반환한다.
 * @param {Object} options 박스의 옵션.
 * @param {string} options.boxTag 박스의 HTML 태그.
 * @param {(null|string|string[])} options.boxClass 박스의 클래스.
 * @param {string} options.text 박스의 innerText
 * @returns {HTMLElement} 생성된 박스 요소
 */
const makeTextBox = ({ boxTag, boxClass = [], text }) => {
    const box = document.createElement(boxTag);
    const boxClassList = Array.isArray(boxClass) ? boxClass : [boxClass];
    box.classList.add(...boxClassList);
    box.innerText = text;
    return box;
};
/**
 * 내부에 이미지 태그가 있는 박스를 반환한다.
 * @param {Object} options 박스의 옵션.
 * @param {string} options.boxTag 박스의 HTML 태그.
 * @param {(null|string|string[])} options.boxClass 박스의 클래스.
 * @param {string} options.imgSrc 이미지 태그의 이미지 주소.
 * @param {(null|string)} options.imgAlt 이미지 태그의 이미지 설명값.
 * @returns {HTMLElement} 생성된 박스 요소
 */
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
/**
 * 내부에 라벨 태그가 있는 박스를 반환한다.
 * @param {Object} options 박스의 옵션.
 * @param {string} options.boxTag 박스의 HTML 태그.
 * @param {(null|string|string[])} options.boxClass 박스의 클래스.
 * @param {string} options.labelFor 라벨이 꾸미는 요소의 ID
 * @param {string} options.labelText 라벨의 innerText
 * @returns {HTMLElement} 생성된 박스 요소
 */
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

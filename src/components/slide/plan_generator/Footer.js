import IMG_SRC from "../../../data/imgPaths.js";
import { makeImgBox, makeTextBox } from "../../common/commonBoxes.js";

export default class Footer {
    constructor({ $target }) {
        const footer = document.createElement("footer");
        $target.append(footer);

        // 깃허브 링크
        const githubLink = makeImgBox({
            boxTag: "a",
            boxClass: "github-link",
            imgSrc: IMG_SRC.github_mark,
            imgAlt: "GitHub 링크",
        });
        githubLink.setAttribute(
            "href",
            "https://github.com/kimbareum/Ormi_Project1"
        );
        githubLink.setAttribute("target", "_blank");

        const pageDescription = makeTextBox({
            boxTag: "p",
            boxClass: "page-description",
            text: "The first project at Ormi Bootcamp. Travel planning helpers with HTML, CSS, and JAVA.",
        });

        footer.append(githubLink, pageDescription);
    }
}

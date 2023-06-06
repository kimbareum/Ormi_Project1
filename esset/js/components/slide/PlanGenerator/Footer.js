import img_src from "../../../data/img_data.js";
import { makeImgBox, makeTextBox } from "../../common/dom_box.js";

export default class Footer {
    constructor({ $target }) {
        const footer = document.createElement("footer");
        $target.append(footer);

        // 깃허브 링크
        const githubLink = makeImgBox({
            boxTag: "a",
            boxClass: "github-link",
            imgSrc: img_src.github_mark,
            imgAlt: "GitHub",
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

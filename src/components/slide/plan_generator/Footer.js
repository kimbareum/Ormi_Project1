import IMG_SRC from "../../../data/imgPaths.js";
import { makeBox, makeTextBox } from "../../common/commonBoxes.js";

/** Footer */
export default class Footer {
    constructor({ $target }) {
        const footer = document.createElement("footer");
        $target.append(footer);

        // 깃허브 링크
        const githubLink = `<a class="github-link" href="https://github.com/kimbareum/Ormi_Project1" target="_blank"><div></div></a>`;

        const pageDescription = makeTextBox({
            boxTag: "p",
            boxClass: "page-description",
            text: "The first project at Ormi Bootcamp. Travel planning helpers with HTML, CSS, and JAVA.",
        });

        footer.innerHTML = githubLink;

        footer.append(pageDescription);
    }
}

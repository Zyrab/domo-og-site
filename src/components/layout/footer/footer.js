// src/components/footer/footer.js
import Domo from "@zyrab/domo";
import createButton from "../../ui/button/button.js";
import createIcon from "../../ui/icon.js";
import getLocales from "../../../assets/locales/get-locale.js";

export default function createFooter() {
  const currentYear = new Date().getFullYear();
  const copy = `© 2026 - ${currentYear} `;
  const t = getLocales("en", "footer");

  return Domo("footer")
    .cls("footer")
    .child([
      Domo("div")
        .cls("footer__container")
        .child([
          Domo("div")
            .cls("footer__left")
            .child([
              Domo("div")
                .cls("footer__logo")
                .child([
                  createIcon({ icon: "/assets/domo-og.png", size: 40 }),
                  Domo("span").cls("heading-bold").txt(t.title),
                ]),
              Domo("p").cls("footer__desc").txt(t.description),
              Domo("p").cls("footer__copy").txt(`${copy}${t.copy}`),
            ]),
          Domo("div")
            .cls("footer__right")
            .child([
              Domo("div")
                .cls("footer__col")
                .child([
                  Domo("span").cls("footer__col-title").txt(t.links.title),
                  t.links.items.map((link) => createButton(link).css({ "justify-content": "start" })),
                ]),
              Domo("div")
                .cls("footer__col")
                .child([
                  Domo("span").cls("footer__col-title").txt(t.resources.title),
                  t.resources.items.map((link) =>
                    createButton({ ...link, target: "_blank", child: [createIcon({ icon: link.icon })] }).css({
                      "justify-content": "start",
                    }),
                  ),
                ]),
            ]),
        ]),
    ]);
}

import Domo from "@zyrab/domo";
import Router from "@zyrab/domo-router";
import createButton from "../../ui/button/button.js";
import getLocales from "../../../assets/locales/get-locale.js";
import createIcon from "../../ui/icon.js";

export default function createHeader() {
  const path = Router.base();
  const t = getLocales("en", "header");

  return Domo("header")
    .cls("header")
    .child([
      Domo("input").attr({ type: "checkbox", id: "header-toggle" }).cls("header__toggle"),
      Domo("div")
        .cls("header__container")
        .child([
          Domo("div")
            .cls("header__brand")
            .child([
              Domo("a")
                .attr({ href: "/" })
                .cls("header__logo")
                .child([
                  createIcon({ icon: "assets/domo-og.png", size: 32 }),
                  Domo("span").cls("heading-bold").txt(t.title),
                ]),
              Domo("label")
                .attr({ for: "header-toggle" })
                .cls("header__mobile-toggle burger-menu")
                .child([Domo("div").cls("bar bar1"), Domo("div").cls("bar bar2"), Domo("div").cls("bar bar3")]),
            ]),
          Domo("div")
            .cls("header__menu")
            .attr({ id: "main-nav" })
            .child([
              Domo("nav")
                .cls("header__nav")
                .child(t.nav.map((nav) => createButton(nav).cls(nav.href === path ? "active" : ""))),
              Domo("div")
                .cls("header__right")
                .child(
                  t.buttons.map((b) => createButton({ ...b, target: "_blank", child: [createIcon({ icon: b.icon })] })),
                ),
            ]),
        ]),
    ]);
}

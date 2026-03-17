import Domo from "@zyrab/domo";
import Router from "@zyrab/domo-router";
import createButton from "../../ui/button/button.js";
import getLocales from "../../../assets/locales/get-locale.js";
import createIcon from "../../ui/icon.js";

export default function createHeader() {
  const path = Router.base();
  const t = getLocales("en", "header");
  let menuRef = null;
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
    if (menuRef) {
      if (isOpen) {
        menuRef.classList.add("is-open");
      } else {
        menuRef.classList.remove("is-open");
      }
    }
  }

  return Domo("header")
    .cls("header")
    .child([
      Domo("div")
        .cls("header__container")
        .child([
          Domo("div")
            .cls("header__brand")
            .child([
              createButton({
                label: "Domo-OG",
                variant: "outline",
                href: "/",
                className: "header__logo-override",
              }),
              Domo("button").cls("header__mobile-toggle").txt("☰"),
            ]),
          Domo("div")
            .cls("header__menu")
            .ref((el) => (menuRef = el))
            .child([
              Domo("nav")
                .cls("header__nav")
                .child(t.nav.map((nav) => createButton(nav).cls(nav.href === path ? "active" : ""))),
              Domo("div")
                .cls("header__right")
                .child(t.buttons.map((b) => createButton({ ...b, child: [createIcon({ icon: b.icon })] }))),
            ]),
        ]),
    ])
    .onClosest("click", { ".header__mobile-toggle": toggleMenu });
}

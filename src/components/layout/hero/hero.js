// src/components/layout/hero/hero.js
import Domo from "@zyrab/domo";
import createBadge from "../../ui/badge/badge.js";
import createButton from "../../ui/button/button.js";
import createInfoCard from "../info-card/info-card.js";
import createCodeHighlight from "../../ui/code-highlight/code-highlight.js";
import getLocales from "../../../assets/locales/get-locale.js";
export default function createHero() {
  const t = getLocales("en", "hero");

  return Domo("section")
    .cls("hero")
    .child([
      Domo("div")
        .cls("hero__container")
        .child([
          Domo("div")
            .cls("hero__content")
            .child([
              createBadge(t.badge),
              Domo("h1")
                .cls("hero__title heading-bold")
                .child(t.title.map(({ t, cls }) => Domo("span").txt(t).cls(cls))),
              Domo("p").cls("hero__desc").txt(t.description),
              Domo("div").cls("hero__actions").child(t.actions.map(createButton)),
              Domo("div").cls("hero__benchmarks").child(t.benchmarks.map(createInfoCard)),
            ]),
          Domo("div")
            .cls("hero__graphic")
            .child([
              Domo("div")
                .cls("hero__code-card")
                .child([
                  Domo("div")
                    .cls("hero__code-badge")
                    .child([createBadge(t.code_badge)]),
                  Domo("div")
                    .cls("hero__code-container")
                    .child([createCodeHighlight({ code: t.code })]),
                ]),
            ]),
        ]),
    ]);
}

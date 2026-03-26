import Domo from "@zyrab/domo";
import createInfoCard from "../components/composed/info-card.js";
import createHero from "../components/layout/hero.js";
import createPlayground from "../components/layout/playground/playground.js";
import createVersionBar from "../components/layout/version-bar.js";
import getLocales from "../assets/locales/get-locale.js";

import { copyCode } from "../components/composed/code-copy.js";
import { changeTemplate } from "../components/layout/playground/handlers/handle-change-template.js";
import { toggleTemplateEditor } from "../components/layout/playground/handlers/handle-toggle-template-editor.js";
import { toggleAccordion, handleKeyDown } from "../components/ui/accordion.js";

export default function createLandingPage() {
  const f = getLocales("en", "featured");
  return Domo("div")
    .cls("landing-page")
    .id("landing-page")
    .child([
      createVersionBar(),
      createHero(),
      Domo("section")
        .cls("features")
        .child([
          Domo("h2").cls("features__title heading-bold").txt(f.title),
          Domo("div").cls("features__grid").child(f.cards.map(createInfoCard)),
        ]),
      createPlayground(),
    ])
    .onClosest("click", {
      ".copy": copyCode,
      ".mode-switcher": toggleTemplateEditor,
      ".change-template": changeTemplate,
      ".accordion__summary": toggleAccordion,
    })
    .on("keydown", handleKeyDown);
}

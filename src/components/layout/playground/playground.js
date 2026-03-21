// src/components/layout/playground/playground.js
import Domo from "@zyrab/domo";

import createButton from "../../ui/button/button.js";
import createIcon from "../../ui/icon.js";
import createCodeCopy from "../../composed/code-copy.js";
import createTooltip from "../../ui/tooltip/tooltip.js";

import createEditorView from "./islands/editor-view.js";
import createPreviewView from "./islands/preview-view.js";

import { templates } from "./templates.js";

import getLocales from "../../../assets/locales/get-locale.js";

export default function createPlayground() {
  const t = getLocales("en", "playground");
  let currentTemplateId = "blog";

  const templateString = ` {\n"const template" = ${JSON.stringify(templates[currentTemplateId], null, 2)}\n}`;

  const switchEditorView = () => {
    const { tooltip, button, edit, object } = t.editor_switcher;
    return createTooltip({
      ...tooltip,
      child: [createButton({ ...button, child: [createIcon(edit), createIcon(object)] })],
    });
  };
  return Domo("section")
    .id("playground")
    .cls("playground")
    .child([
      Domo()
        .cls("playground__container")
        .child([
          Domo("div")
            .cls("playground__header")
            .child([
              Domo()
                .cls("flex flex-col")
                .child([
                  Domo("h2").cls("playground__title heading-bold").txt(t.title),
                  Domo("p").cls("playground__subtitle").txt(t.subtitle),
                  Domo("p").css({ fontSize: "0.8rem", opacity: 0.6, marginTop: "4px" }).txt(t.note),
                ]),
              Domo()
                .cls("playground__template-list")
                .child(
                  t.template_buttons.map(({ label, key }) =>
                    createButton({
                      label,
                      variant: "dark",
                      "data-template": JSON.stringify(templates[key], null, 2),
                      cls: "change-template",
                    }).cls(key === currentTemplateId ? "active" : ""),
                  ),
                ),
            ]),
          Domo("div")
            .cls("playground__workspace")
            .child([
              Domo("div")
                .cls("playground__editor-pane")
                .child([
                  Domo("div")
                    .cls("playground__editor-header")
                    .child([
                      Domo("h3").cls("title").txt("templates"),
                      Domo("div")
                        .cls("playground__tabs")
                        .child([
                          switchEditorView(),
                          createCodeCopy({
                            ...t.code_copy,
                            button: { ...t.code_copy.button, "data-code": templateString },
                          }),
                        ]),
                    ]),
                ])
                .id("template-editor-pane")
                .island(createEditorView),

              Domo("div")
                .cls("playground__preview-pane")
                .child([
                  Domo("div")
                    .cls("playground__editor-header")
                    .child([Domo("h3").cls("title").txt(t.og_preview)]),
                ])
                .island(createPreviewView),
            ]),
        ]),
    ]);
}

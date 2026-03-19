// src/components/layout/playground/playground.js
import Domo from "@zyrab/domo";
import createButton from "../../ui/button/button.js";
import createTemplateCode from "./template-code.js";
import createTemplatePreview from "./template-preview.js";
import createTemplateEditor from "./template-editor.js";
import { templates } from "./templates.js";
import createCodeCopy from "../../composed/code-copy.js";
import createTemplateSwitcher from "./template-editor-switcher.js";
import getLocales from "../../../assets/locales/get-locale.js";
// --- TEMPLATE DATA ---

export default function createPlayground() {
  const t = getLocales("en", "playground");
  let currentTemplateId = "blog";

  let templateCodeDisplay = createTemplateCode(templates.blog);
  let templateEditorDisplay = createTemplateEditor(templates.blog);
  let templatePreviewDisplay = createTemplatePreview(templates.blog);


  function updateDisplays(templateId) {
    const templateData = templates[templateId];

    const codeNode = createTemplateCode(templateData);
    const isEditing = templateCodeDisplay.element.classList.contains("hidden");
    templateCodeDisplay.replace(templateCodeDisplay.build(), codeNode.build());
    templateCodeDisplay = codeNode.cls(isEditing ? "hidden" : "");

    const editorNode = createTemplateEditor(templateData);
    templateEditorDisplay.replace(templateEditorDisplay.build(), editorNode.build());
    templateEditorDisplay = editorNode.cls(isEditing ? "" : "hidden");

    const previewNode = createTemplatePreview(templateData);
    templatePreviewDisplay.replace(templatePreviewDisplay.build(), previewNode.build());
    templatePreviewDisplay = previewNode;
  }

  function changeTemplate(e, t) {
    const parent = t.parentNode;
    const active = parent.querySelector(".active");
    if (active) active.classList.remove("active");

    t.classList.add("active");
    currentTemplateId = t.dataset.template;
    updateDisplays(currentTemplateId);
  }


  function handleTemplateUpdate(e) {
    const newTemplateData = e.detail;
    const newPreviewNode = createTemplatePreview(newTemplateData);
    templatePreviewDisplay.replace(templatePreviewDisplay.build(), newPreviewNode.build());
    templatePreviewDisplay = newPreviewNode;
    const newCodeNode = createTemplateCode(newTemplateData);
    templateCodeDisplay.replace(templateCodeDisplay.build(), newCodeNode.build());
    templateCodeDisplay = newCodeNode.cls("hidden");
  }



  const templateString = ` {\n"const template" = ${JSON.stringify(templates[currentTemplateId], null, 2)}\n}`;

  return Domo("section")
    .cls("playground")
    .id("playground")
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
                  Domo("p")
                    .css({ fontSize: "0.8rem", opacity: 0.6, marginTop: "4px" })
                    .txt(t.note),
                ]),
              Domo()
                .cls("playground__template-list")
                .child(
                  t.template_buttons.map(({ label, key }) =>
                    createButton({ label, variant: "dark", "data-template": key, cls: "change-template" }).cls(key === currentTemplateId ? "active" : ""),
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
                          createTemplateSwitcher(t.editor_switcher),
                          createCodeCopy({
                            ...t.code_copy,
                            button: { ...t.code_copy.button, "data-code": templateString },
                          }),
                        ]),
                    ]),
                  templateCodeDisplay,
                  templateEditorDisplay.cls("hidden"),
                ])
                .id("template-editor-pane")
                .on("template-update", handleTemplateUpdate),

              // RIGHT PANE
              Domo("div")
                .cls("playground__preview-pane")
                .child([
                  Domo("div")
                    .cls("playground__editor-header")
                    .child([Domo("h3").cls("title").txt(t.og_preview)]),
                  templatePreviewDisplay,
                ]),
            ]),
        ]),
    ])
    .onClosest("click", {
      ".change-template": changeTemplate,
    });
}

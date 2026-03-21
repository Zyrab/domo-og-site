import createTemplateCode from "../islands/template-code.js";
import createTemplateEditor from "../islands/template-editor.js";
import createTemplatePreview from "../islands/preview/template-preview.js";

export function changeTemplate(e, t) {
  const parent = t.parentNode;
  const active = parent.querySelector(".active");
  if (active) active.classList.remove("active");

  t.classList.add("active");

  const currentTemplateString = t.dataset.template;

  try {
    const templateObject = JSON.parse(currentTemplateString);

    const codeView = document.getElementById("template-code");
    const isCodeActive = codeView.classList.contains("hidden");

    const editorView = document.getElementById("template-editor");
    const canvasView = document.getElementById("preview-canvas");

    codeView.replaceWith(
      createTemplateCode(currentTemplateString)
        .cls(isCodeActive ? "hidden" : "")
        .build(),
    );
    editorView.replaceWith(
      createTemplateEditor(templateObject)
        .cls(!isCodeActive ? "hidden" : "")
        .build(),
    );
    canvasView.replaceWith(createTemplatePreview(templateObject).build());
  } catch (error) {
    console.error("Failed to parse template JSON:", error);
  }
}

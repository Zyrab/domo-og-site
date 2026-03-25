import Domo from "@zyrab/domo";
import createCodeHighlight from "../../../ui/code-highlight.js";

export default function createTemplateCode(template) {
  let code = "";
  if (typeof template === "string") {
    code = `const template = ${template}`;
  } else {
    code = `const template = ${JSON.stringify(template, null, 2)}`;
  }

  return Domo()
    .cls("playground__pane-content")
    .id("template-code")
    .child([createCodeHighlight({ code })]);
}

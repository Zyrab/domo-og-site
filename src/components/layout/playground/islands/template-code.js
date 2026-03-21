import Domo from "@zyrab/domo";
import createCodeHighlight from "../../../ui/code-highlight/code-highlight.js";

export default function createTemplateCode(template) {
  let code = "";
  if (typeof template === "string") {
    // const str = template.toString();
    // const result = str.slice(7, -1);
    code = `const template = ${template}`;
  } else {
    code = `const template = ${JSON.stringify(template, null, 2)}`;
  }

  return Domo()
    .cls("playground__pane-content")
    .id("template-code")
    .child([createCodeHighlight({ code })]);
}

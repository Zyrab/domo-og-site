import { defultTemplate } from "./defaut-template.js";
import createTemplateCode from "./template-code.js";
import createTemplateEditor from "./template-editor.js";

export default function createEditorView() {
  const frag = document.createDocumentFragment();
  frag.append(createTemplateCode(defultTemplate).build());
  frag.append(createTemplateEditor(defultTemplate).cls("hidden").build());
  return frag;
}

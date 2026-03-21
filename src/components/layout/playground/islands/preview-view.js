import createTemplatePreview from "./preview/template-preview.js";
import { defultTemplate } from "./defaut-template.js";

export default function createPreviewView() {
  const frag = document.createDocumentFragment();
  frag.append(createTemplatePreview(defultTemplate).build());
  return frag;
}

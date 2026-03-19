import createButton from "../../ui/button/button.js";
import createIcon from "../../ui/icon.js";
import createTooltip from "../../ui/tooltip/tooltip.js";

export default function createTemplateSwitcher({ tooltip, button, edit, object }) {
    return createTooltip({
        ...tooltip,
        child: [createButton({ ...button, child: [createIcon(edit), createIcon(object)] })],
    });
}

export function toggleTemplateEditor(e, btn) {
    const editor = document.getElementById("template-editor");
    const code = document.getElementById("template-code");

    const state = btn.dataset.state;
    const newHint = btn.dataset.change;

    const tooltip = btn.nextSibling;
    const oldHint = tooltip.textContent;

    btn.children[0].style.display = state === "0" ? "none" : "inline-flex";
    btn.children[1].style.display = state === "0" ? "inline-flex" : "none";
    editor.classList.toggle("hidden");
    code.classList.toggle("hidden");
    btn.dataset.change = oldHint;
    btn.dataset.state = state === "0" ? "1" : "0";
    tooltip.textContent = newHint;
}

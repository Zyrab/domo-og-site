import createButton from "../ui/button/button.js";
import createIcon from "../ui/icon.js";
import createTooltip from "../ui/tooltip/tooltip.js";

export default function createCodeCopy({ tooltip, button, copy, copied }) {
  return createTooltip({
    ...tooltip,
    child: [createButton({ ...button, child: [createIcon(copy), createIcon(copied)] })],
  });
}

export function copyCode(e, btn) {
  const code = btn.dataset.code;
  const newHint = btn.dataset.change;
  const tooltip = btn.nextSibling;
  const oldHint = tooltip.textContent;
  btn.children[0].classList.add("hidden");
  btn.children[1].classList.remove("hidden");
  tooltip.textContent = newHint;

  navigator.clipboard.writeText(code);
  setTimeout(() => {
    btn.children[0].classList.remove("hidden");
    btn.children[1].classList.add("hidden");
    tooltip.textContent = oldHint;
  }, 2000);
}

import createButton from "../ui/button/button.js";
import createIcon from "../ui/icon.js";
import createTooltip from "../ui/tooltip/tooltip.js";

export default function createCodeCopy({ tooltip, button, copy, copied }) {
  return createTooltip({
    ...tooltip,
    child: [createButton({ ...button, child: [createIcon(copy), createIcon(copied).show(false)] })],
  });
}

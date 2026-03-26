import Domo from "@zyrab/domo";

/**
 * Tooltip({
 * text: "This is the popup text!",
 * position: "top" | "bottom" | "left" | "right",
 * variant: "dark" | "yellow" | "pink" | "blue" | "white",
 * children: [Button({...})] // The thing you hover over
 * })
 */
export default function createTooltip({ text = "", position = "top", variant = "dark", child = [] }) {
  const tooltipId = `tt-${Math.random().toString(36).slice(2, 11)}`;

  const popup = Domo("div")
    .cls(`tooltip-popup tooltip-${position} tooltip-${variant}`)
    .txt(text)
    .attr({ role: "tooltip", id: tooltipId });

  const enhancedChildren = Array.isArray(child)
    ? child.map((c) => c.attr({ "aria-describedby": tooltipId }))
    : [child.attr({ "aria-describedby": tooltipId })];

  const wrapper = Domo("div")
    .cls("tooltip-wrapper")
    .child([...enhancedChildren, popup]);

  return wrapper;
}

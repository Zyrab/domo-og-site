import Domo from "@zyrab/domo";

/**
 * Tooltip({
 * text: "This is the popup text!",
 * position: "top" | "bottom" | "left" | "right",
 * variant: "dark" | "yellow" | "pink" | "blue" | "white",
 * children: [Button({...})] // The thing you hover over
 * })
 */
export default function createTooltip(props = {}) {
  const { text = "", position = "top", variant = "dark", child = [] } = props;

  // 1. The hidden popup bubble
  const popup = Domo("div")
    .cls(`tooltip-popup tooltip-${position} tooltip-${variant}`)
    .txt(text)
    .attr({ role: "tooltip" });

  // 2. The wrapper that holds both the trigger and the popup
  const wrapper = Domo("div")
    .cls("tooltip-wrapper")
    .child([
      ...child, // Usually a Button or Icon
      popup, // The hidden text
    ])
    // Accessibility: show tooltip if the user tabs to the button with their keyboard
    .attr({ tabindex: "0" });

  return wrapper;
}

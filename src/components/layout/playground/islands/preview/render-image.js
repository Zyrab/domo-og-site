import Domo from "@zyrab/domo";
import getPositionStyle from "./get-position-style.js";

export default function createRenderImage(el, scale) {
  const posStyle = getPositionStyle(el, scale);
  const src = el.src.startsWith("assets/") || el.src.startsWith("http") ? el.src : `assets/preview-images/dinamic.webp`;
  return Domo("img")
    .attr({ src })
    .css({
      position: "absolute",
      ...posStyle,
      objectFit: "contain",
      boxSizing: "border-box",
    })
    .build();
}

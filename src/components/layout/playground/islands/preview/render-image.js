import Domo from "@zyrab/domo";
import getPositionStyle from "./get-position-style.js";

export default function createRenderImage(el, scale) {
  const posStyle = getPositionStyle(el, scale);

  return Domo("img")
    .attr({ src: el.src })
    .css({
      position: "absolute",
      ...posStyle,
      objectFit: "contain",
      boxSizing: "border-box",
    })
    .build();
}

import Domo from "@zyrab/domo";
import getPositionStyle from "./get-position-style.js";

export default function createRenderText(el, scale) {
  const posStyle = getPositionStyle(el, scale);
  const fontSize = (el.fontSize || 32) * scale;

  return Domo("p")
    .css({
      position: "absolute",
      ...posStyle,
      color: el.color || "#000",
      fontSize: `${fontSize}px`,
      padding: `${(el.bgPadding || 0) * scale}px`,
      background: el.backgroundColor || "transparent",
      borderRadius: `${(el.borderRadius || 0) * scale}px`,
      textAlign: el.horizontalAlign || "left",
      overflowWrap: "break-word",
      whiteSpace: "pre-wrap",
      wordBreak: "normal",
      boxSizing: "border-box",
      margin:
        posStyle.marginTop !== "0" || posStyle.marginLeft !== "0"
          ? `${posStyle.marginTop} ${posStyle.marginRight} ${posStyle.marginBottom} ${posStyle.marginLeft}`
          : 0,
    })
    .txt(el.maxLength ? el.content.slice(0, el.maxLength) : el.content)
    .build();
}

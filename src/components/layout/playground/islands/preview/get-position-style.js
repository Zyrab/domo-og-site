export default function getPositionStyle(el, scale) {
  const pad = (el.padding || 0) * scale;
  const bgPad = el.type === "text" ? (el.bgPadding || 0) * scale : 0;
  const offset = pad - bgPad;

  let left = "auto",
    right = "auto",
    top = "auto",
    bottom = "auto";
  let marginLeft = "0",
    marginRight = "0",
    marginTop = "0",
    marginBottom = "0";

  if (el.horizontalAlign === "center") {
    left = `${offset}px`;
    right = `${offset}px`;
    marginLeft = "auto";
    marginRight = "auto";
  } else if (el.horizontalAlign === "right") {
    right = `${offset}px`;
  } else {
    left = `${offset}px`;
  }

  if (el.verticalAlign === "middle") {
    top = `${offset}px`;
    bottom = `${offset}px`;
    marginTop = "auto";
    marginBottom = "auto";
  } else if (el.verticalAlign === "bottom") {
    bottom = `${offset}px`;
  } else {
    top = `${offset}px`;
  }

  const width = el.width ? `${el.width * scale}px` : el.type === "text" ? "fit-content" : "auto";
  const height = el.height ? `${el.height * scale}px` : el.type === "text" ? "fit-content" : "auto";

  return {
    left,
    right,
    top,
    bottom,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    width,
    height,
    maxWidth: `calc(100% - ${offset * 2}px)`,
    maxHeight: `calc(100% - ${offset * 2}px)`,
  };
}

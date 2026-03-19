import Domo from "@zyrab/domo";

export default function createTemplatePreview(template) {
  const VIRTUAL_WIDTH = 1200;
  const VIRTUAL_HEIGHT = 630;

  let dimensions = { w: 0, h: 0 };

  function getPositionStyle(el, scale) {
    const pad = (el.padding || 0) * scale;
    const bgPad = el.type === "text" ? (el.bgPadding || 0) * scale : 0;
    const offset = pad - bgPad;

    let left = "auto", right = "auto", top = "auto", bottom = "auto";
    let marginLeft = "0", marginRight = "0", marginTop = "0", marginBottom = "0";

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

    const width = el.width ? `${el.width * scale}px` : (el.type === "text" ? "fit-content" : "auto");
    const height = el.height ? `${el.height * scale}px` : (el.type === "text" ? "fit-content" : "auto");

    return {
      left, right, top, bottom,
      marginLeft, marginRight, marginTop, marginBottom,
      width, height,
      maxWidth: `calc(100% - ${offset * 2}px)`,
      maxHeight: `calc(100% - ${offset * 2}px)`,
    };
  }

  function renderText(el, scale) {
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
        margin: posStyle.marginTop !== "0" || posStyle.marginLeft !== "0" ? `${posStyle.marginTop} ${posStyle.marginRight} ${posStyle.marginBottom} ${posStyle.marginLeft}` : 0,
      })
      .txt(el.maxLength ? el.content.slice(0, el.maxLength) : el.content)
      .build();
  }

  function renderImage(el, scale) {
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

  function buildScaledContent() {
    const scale = dimensions.w / VIRTUAL_WIDTH;

    const frag = document.createDocumentFragment();

    template.elements.forEach((el) => {
      if (el.type === "text") frag.append(renderText(el, scale));
      if (el.type === "image") frag.append(renderImage(el, scale));
    });

    return frag;
  }

  function observeDimensions(el) {
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;

      if (!w || w === dimensions.w) return;

      dimensions.w = w;
      dimensions.h = h;

      el.style.height = `${(VIRTUAL_HEIGHT * w) / VIRTUAL_WIDTH}px`;

      el.replaceChildren(buildScaledContent());
    });

    ro.observe(el);
  }

  return Domo()
    .cls("preview-canvas")
    .child([
      template.background?.type === "image"
        ? Domo("img")
          .attr({ src: template.background.src })
          .css({
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "0"
          })
        : Domo(),
      Domo()
        .css({
          position: "relative",
          width: "100%",
          height: "100%",
          background: template.background?.type === "color" ? template.background.value : "transparent",
          zIndex: "1"
        })
        .id("preview-canvas")
        .ref(observeDimensions)
    ]);
}

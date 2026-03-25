import Domo from "@zyrab/domo";
import createRenderText from "./render-text.js";
import createRenderImage from "./render-image.js";

export default function createTemplatePreview(template) {
  const VIRTUAL_WIDTH = 1200;
  const VIRTUAL_HEIGHT = 630;

  let dimensions = { w: 0, h: 0 };

  function buildScaledContent() {
    const scale = dimensions.w / VIRTUAL_WIDTH;

    const frag = document.createDocumentFragment();

    template.elements.forEach((el) => {
      if (el.type === "text") frag.append(createRenderText(el, scale));
      if (el.type === "image") frag.append(createRenderImage(el, scale));
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
        ? Domo("img").attr({ src: template.background.src }).css({
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "0",
        })
        : Domo(),
      Domo()
        .css({
          position: "relative",
          width: "100%",
          height: "100%",
          background: template.background?.type === "color" ? template.background.value : "transparent",
          zIndex: "1",
        })
        .id("preview-canvas")
        .ref(observeDimensions),
    ]);
}

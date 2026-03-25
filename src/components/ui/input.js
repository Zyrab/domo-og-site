import Domo from "@zyrab/domo";

export default function createInput({ label, type = "text", value, name }) {
  if (type === "color") {
    let valueRef = null;

    return Domo("div")
      .cls("form-group")
      .child([
        Domo("label").cls("form-label").txt(label),
        Domo("div")
          .cls("form-input-color-wrapper")
          .child([
            Domo("input")
              .cls("form-input-color")
              .attr({ type: "color", value, name })
              .on("input", (e) => {
                if (valueRef) valueRef.textContent = e.target.value.toUpperCase();
              }),
            Domo("span")
              .cls("form-input-color-value")
              .txt(value ? String(value).toUpperCase() : "#000000")
              .ref((el) => (valueRef = el)),
          ]),
      ]);
  }

  return Domo("div")
    .cls("form-group")
    .child([
      Domo("label").cls("form-label").txt(label),
      Domo("input")
        .cls("form-input")
        .attr({ type, value, name })
    ]);
}


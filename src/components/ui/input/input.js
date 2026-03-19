import Domo from "@zyrab/domo";

export default function createInput({ label, type = "text", value, name }) {
  return Domo("div")
    .cls("form-group")
    .child([
      Domo("label").cls("form-label").txt(label),
      Domo("input")
        .cls("form-input")
        .attr({ type, value, name })
    ]);
}

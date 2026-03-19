import Domo from "@zyrab/domo";

export default function createSelect({ label, options, value, name }) {
  return Domo("div")
    .cls("form-group")
    .child([
      Domo("label").cls("form-label").txt(label),
      Domo("select")
        .cls("form-input")
        .attr({ name })
        .child(
          options.map((opt) =>
            Domo("option")
              .attr({ value: opt.value })
              .txt(opt.label)
              [opt.value === value ? "attr" : "data"]({ selected: "true" })
          )
        ),
    ]);
}

import Domo from "@zyrab/domo";

/**
 * Creates a managed accordion component.
 * @param {Object} props
 * @param {string} props.label - The summary text.
 * @param {Domo|Domo[]} props.children - The content revealed when open.
 * @param {boolean} [props.isOpen=false] - Initial state.
 * @param {string} [props.group] - Optional group name for exclusive behavior.
 */
export default function createAccordion({ label, children, isOpen = false, group }) {
  let detailsRef = null;

  function handleToggle(e) {
    if (detailsRef.open && group) {
      const parent = detailsRef.parentElement;
      if (!parent) return;

      // Close other details in the same group within the same container
      const accordions = parent.querySelectorAll(`details[data-group="${group}"]`);
      accordions.forEach((acc) => {
        if (acc !== detailsRef && acc.open) {
          acc.open = false;
        }
      });
    }
  }

  function handleKeyDown(e) {
    const summary = e.currentTarget;
    const parent = detailsRef.parentElement;
    if (!parent) return;

    const summaries = Array.from(parent.querySelectorAll(`details[data-group="${group}"] > summary`));
    const index = summaries.indexOf(summary);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % summaries.length;
      summaries[nextIndex].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + summaries.length) % summaries.length;
      summaries[prevIndex].focus();
    }
  }

  return Domo("details")
    .cls("accordion")
    .attr({ open: isOpen ? "" : undefined })
    .data({ group: group || "default" })
    .ref((el) => (detailsRef = el))
    .on("toggle", handleToggle)
    .child([
      Domo("summary")
        .cls("accordion__summary")
        .on("keydown", handleKeyDown)
        .child([
          Domo("span").cls("accordion__label").txt(label),
          Domo("span").cls("accordion__icon").txt("→"), // CSS will rotate this
        ]),
      Domo("div").cls("accordion__content").child(children),
    ]);
}

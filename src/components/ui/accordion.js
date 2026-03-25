import Domo from "@zyrab/domo";

/**
 * Creates a managed accordion component.
 * @param {Object} props
 * @param {string} props.label - The summary text.
 * @param {Domo|Domo[]} props.children - The content revealed when open.
 * @param {boolean} [props.open=false] - Initial state.
 * @param {string} [props.single="never"] - Changes opening behaviour in group. [never, always, once]
 * @param {string} [props.group] - Optional group name for exclusive behavior.
 */
export default function createAccordion({ label, children, open = false, single = "never", group = "default" }) {
  const id = Math.random().toString(36).substr(2, 9);
  return Domo("details")
    .cls("accordion")
    .attr({ open })
    .data({ group, single })
    .child([
      Domo("summary")
        .cls("accordion__summary")
        .id(`hdr-${id}`)
        .child([
          Domo("span").cls("accordion__label").txt(label),
          Domo("span").cls("accordion__icon").attr({ "aria-hidden": "true" }).txt("→"),
        ]),
      Domo("div")
        .cls("accordion__content")
        .attr({ role: "region", "aria-labelledby": `hdr-${id}` })
        .child(children),
    ]);
}

export function toggleAccordion(e, summary) {
  // let summary = e.target.closest(".accordion__summary");
  // if (!summary) return;
  const details = summary.parentElement;
  const parent = details.parentElement;
  const group = details.dataset.group;
  const single = details.dataset.single;

  if (single === "never") return;

  const isClosing = details.hasAttribute("open");
  const isOpening = !isClosing;
  const groupElements = Array.from(parent.querySelectorAll(`.accordion[data-group="${group}"]`));

  const once = single === "once";
  const always = single === "always";

  if (isOpening && (once || always))
    groupElements.forEach((el) => {
      if (el !== details) el.removeAttribute("open");
    });

  if (isClosing && always) {
    e.preventDefault();

    const currentIndex = groupElements.indexOf(details);
    const nextIndex = (currentIndex + 1) % groupElements.length;

    details.removeAttribute("open");
    groupElements[nextIndex].setAttribute("open", "");
    groupElements[nextIndex].querySelector("summary").focus();
  }
}

export function handleKeyDown(e) {
  const accordeon = e.target.closest(".accordion");
  if (!accordeon) return;

  const parent = accordeon.parentElement;
  const group = accordeon.dataset.group;
  const summaries = Array.from(parent.querySelectorAll(`details[data-group="${group}"] > summary`));
  const index = summaries.indexOf(accordeon.querySelector("summary"));

  let newIndex;
  switch (e.key) {
    case "ArrowDown":
      newIndex = (index + 1) % summaries.length;
      break;
    case "ArrowUp":
      newIndex = (index - 1 + summaries.length) % summaries.length;
      break;
    case "Home":
      newIndex = 0;
      break;
    case "End":
      newIndex = summaries.length - 1;
      break;
    default:
      return;
  }

  e.preventDefault();
  summaries[newIndex].focus();
}

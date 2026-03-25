// src/components/card/card.js
import Domo from "@zyrab/domo";

export default function createCard(props = {}) {
  const { children = [], size = "standard", hoverable = false } = props;

  const el = Domo("div")
    .cls("card");

  if (size === "sm") {
    el.cls("card--sm");
  }

  if (hoverable) {
    el.cls("card--hoverable");
  }

  el.child(children);

  return el;
}

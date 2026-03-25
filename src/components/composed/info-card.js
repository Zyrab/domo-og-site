// src/components/info-card/info-card.js
import Domo from "@zyrab/domo";
import createCard from "../ui/card.js";
import createIcon from "../ui/icon.js";

export default function createInfoCard(props = {}) {
  const { variant = "feature", title = "", description = "", icon = "", color = "", bgColor = "" } = props;

  const size = variant === "benchmark" ? "sm" : "standard";
  const el = createCard({ size }).cls(`info-card info-card--${variant}`);

  if (variant === "feature") {
    el.child([
      Domo("div")
        .cls(`info-card__icon bg-${bgColor}`)
        .child([createIcon({ icon, size: 24 })]),
      Domo("h3").cls("info-card__title--feature").txt(title),
      Domo("p").cls("info-card__desc--feature").txt(description),
    ]);
  } else if (variant === "benchmark") {
    const titleEl = Domo("div").cls("info-card__title--benchmark").txt(title);
    if (color) {
      titleEl.cls(`text-${color}`);
    }
    el.child([titleEl, Domo("div").cls("info-card__desc--benchmark mono").txt(description)]);
  }

  return el;
}

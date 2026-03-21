// src/pages/docs-page.js
import Domo from "@zyrab/domo";
import createVersionBar from "../components/layout/version-bar/version-bar.js";
import createMarkdown from "../components/ui/markdown/markdown.js";
import createButton from "../components/ui/button/button.js";
import { copyCode } from "../components/composed/code-copy.js";

import { fetchText } from "../components/composed/fetch.js";

export default async function createDocsPage() {
  const docs = await fetchText("/src/assets/locales/en/docs.md");
  // const res = await fetch("/src/assets/locales/en/docs.md");
  // const docs = await res.text();
  const lines = docs.split("\n");
  const headings = lines
    .filter((l) => l.startsWith("#"))
    .map((l) => {
      const match = l.match(/^(#{1,6})\s+(.*)/);
      if (!match) return null;
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
      return { level, text, id };
    })
    .filter((h) => h && h.level <= 3);

  const sidebarTitle = Domo("div").cls("sidebar-title uppercase bold mb-1").txt("Table of Contents");

  const items = headings.map((h) =>
    createButton({
      label: h.text,
      variant: "sidebar-link",
      href: `#${h.id}`,
    }).css({ paddingLeft: `${(h.level - 1) * 1}rem`, justifyContent: "start" }),
  );

  const setupScrollSpy = (el) => {
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            el.querySelectorAll(".docs-sidebar a").forEach((link) => {
              link.classList.toggle("active", link.href.endsWith(`#${id}`));
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "-10% 0px -80% 0px" },
    );

    el.querySelectorAll(".docs-content h1, .docs-content h2, .docs-content h3").forEach((h) => {
      if (!h.id) {
        h.id = h.textContent
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-");
      }
      observer.observe(h);
    });
  };

  return Domo("div")
    .cls("docs-page")
    .child([
      createVersionBar(),
      Domo("div")
        .cls("docs-layout container")
        .child([
          Domo("aside").cls("docs-sidebar sticky-top pt-4 pb-4").child([sidebarTitle, items]),
          Domo("main")
            .cls("docs-content pt-4 pb-4")
            .child([createMarkdown({ content: docs })]),
        ]),
    ])
    .id("docs-page")
    .onClosest("click", { ".copy": copyCode })
    .ref(setupScrollSpy);
}

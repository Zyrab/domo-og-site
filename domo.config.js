// domo.config.js
export default {
  outDir: "./dist",
  routesFile: "./src/routes.js",
  layout: "./src/components/layout/layout.js",
  author: "Domo SSG",
  baseUrl: "https://www.domo.zyrab.dev/domo-og-site/",
  lang: "en",
  theme: "auto",
  exclude: ["js", "css", "app-ads.txt", "assets", "data"],
  assets: {
    // scripts: ["test.js", "global.js", { href: "theme-toggle.js", preload: true }],
    styles: [{ href: "global.css", prefetch: false }, "badge.css", "button.css", "card.css",
      "playground.css", "code-highlight.css", "docs-page.css", "footer.css", "header.css",
      "hero.css", "info-card.css", "landing-page.css", "markdown.css", "tooltip.css", "version-bar.css"],
    // fonts: [{ href: "wohaha.woff2", preload: true }, "yasWemadeIt.woff2"],
    favicon: "src/assets/favicon.ico",
  },
};
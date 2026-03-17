export const content = {
  header: {
    nav: [
      { label: "Home", variant: "nav-link", href: "/" },
      { label: "Docs", variant: "nav-link", href: "/docs" },
      { label: "Playground", variant: "nav-link", href: "/#playground" },
    ],
    buttons: [
      { icon: "npm", label: "NPM", variant: "dark", href: "https://www.npmjs.com/package/@zyrab/domo-og" },
      { icon: "github", label: "Github", href: "https://github.com/zyrab/domo/tree/main/packages/domo-og" },
    ],
  },
  version_bar: {
    npm: "npm install @zyrab/domo-og",
    code_copy: {
      button: {
        variant: "dark",
        cls: "copy active",
        "aria-label": "copy code",
        "data-code": "npm install @zyrab/domo-og",
        "data-change": "code copied",
      },
      copy: { icon: "copy" },
      tooltip: { text: "copy code", variant: "dark", position: "bottom" },
      copied: { icon: "check_mark", alt: "code copied" },
    },
    badge: { label: "v0.2.1", variant: "white" },
  },

  hero: {
    code: `
        // Instant generation via Resvg
        import { generateOgImage } from "@zyrab/domo-og";

        await generateOgImage({
          slug: "my-post",
          title: "Hello World",
          template: { 
            background: {
              type: "color",
              value: "#40C4FF"
            },
            elements: [
              {
                type: "text",
                content: "{{title}}",
                fontSize:  120,
              }
            ] 
          },
        });`,
    badge: { label: "Config-Driven • WASM Powered", variant: "yellow" },
    title: [{ t: "Blazing Fast " }, { t: "OG GENERATOR", cls: "highlight-bg" }, { t: " for Node.js" }],
    description:
      "Domo-OG effortlessly captures perfect Open Graph images without headless browsers. Cross-platform, ultra-lightweight, and lightning fast.",
    actions: [
      { label: "Read the Docs", href: "/docs" },
      { label: "Live Preview ↓", variant: "outline", href: "#playground" },
    ],
    benchmarks: [
      { variant: "benchmark", title: "~33ms", description: "average render time", color: "pink" },
      { variant: "benchmark", title: "Zero", description: "Puppeteer/browser", color: "primary" },
      { variant: "benchmark", title: "WASM", description: "Cross-platform Engine", color: "yellow" },
    ],
    code_badge: { label: "No HTML/CSS Engine!", variant: "pink" },
  },
};

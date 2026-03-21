export const content = {
  header: {
    title: "Domo-OG",
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
      copied: { icon: "check_mark", alt: "code copied", cls: "hidden" },
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
  featured: {
    title: "Why Domo-OG?",
    cards: [
      {
        bgColor: "primary",
        icon: "speed",
        title: "WASM Powered",
        description:
          "Cross-platform compatibility out of the box. No OS-specific binary downloads or fragile native modules.",
      },
      {
        bgColor: "yellow",
        icon: "gear",
        title: "Config-Driven",
        description:
          "Define layouts, backgrounds, text, and images via simple JSON objects. No messing with raw SVG strings.",
      },
      {
        bgColor: "pink",
        icon: "floppy_disk",
        title: "Built-in Caching",
        description: "Prevents redundant generation with an internal manifest, drastically speeding up SSG builds.",
      },
      {
        icon: "block",
        title: "Zero HTML/CSS Engine",
        description: "Uses Resvg for lightning-fast rendering. No browser or DOM required.",
      },
      {
        bgColor: "yellow",
        icon: "globe",
        title: "Remote Fetching",
        description:
          "Safely fetches and caches remote background images with built-in size limits to prevent memory issues.",
      },
    ],
  },
  playground: {
    template_buttons: [
      { label: "blog", key: "blog" },
      { label: "store", key: "store" },
      { label: "saas", key: "saas" },
      { label: "event", key: "event" },
      { label: "news", key: "news" },
    ],
    title: "Live Template Preview",
    subtitle: "See how simple JSON configs map to stunning OG cards.",
    note: "* Note: Some elements (like image width/height and text maxLength) act differently in this sandbox preview.",
    og_preview: "Open Graph Preview",
    code_copy: {
      button: {
        variant: "dark",
        cls: "copy active",
        "aria-label": "copy code",
        "data-change": "code copied",
      },
      copy: { icon: "copy" },
      tooltip: { text: "copy code", variant: "dark", position: "bottom" },
      copied: { icon: "check_mark", alt: "code copied", cls: "hidden" },
    },
    editor_switcher: {
      button: {
        variant: "dark",
        cls: "mode-switcher active",
        "aria-label": "switch template editor mode",
        "data-change": "switch to code",
        "data-state": "0",
      },
      edit: { icon: "edit" },
      tooltip: { text: "switch to editor", variant: "dark", position: "bottom" },
      object: { icon: "object", cls: "hidden" },
    },
  },
  footer: {
    title: "Domo-OG",
    description: "A blazing fast Open Graph image generator powered by Domo. Design with data, not DOM nodes.",
    copy: "Created by Zyrab. Open-source under MIT License.",
    links: {
      title: "Links",
      items: [
        { label: "Home", variant: "link", href: "/" },
        { label: "Docs", variant: "link", href: "/docs" },
        { label: "Playground", variant: "link", href: "/#playground" },
      ],
    },
    resources: {
      title: "Resources",
      items: [
        {
          label: "GitHub",
          variant: "link",
          icon: "github",
          href: "https://github.com/zyrab/domo/tree/main/packages/domo-og",
        },
        { label: "NPM", variant: "link", icon: "npm", href: "https://www.npmjs.com/package/@zyrab/domo-og" },
      ],
    },
    socials: {
      title: "Socials",
      items: [
        { label: "Twitter", variant: "link", icon: "twitter", href: "https://twitter.com/zyramedia" },
        { label: "Discord", variant: "link", icon: "discord", href: "https://discord.gg/zyramedia" },
      ],
    },
  },
};

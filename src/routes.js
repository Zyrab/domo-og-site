// src/routes.js
import createLandingPage from "./pages/landing-page.js";
import createDocsPage from "./pages/docs-page.js";
import createHeader from "./components/layout/header.js";
import createFooter from "./components/layout/footer.js";

export const routes = {
  layouts: {
    default: (c) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(createHeader().build());
      frag.appendChild(c);
      frag.appendChild(createFooter().build());
      return frag;
    },
  },
  "/": {
    component: createLandingPage,
    meta: {
      title: "Domo-OG - A blazing-fast Open Graph image generator",
      description: "Design with data, not DOM nodes.",
      ogImage: "assets/domo-og-open-graph.png",
    },
  },
  "/docs": {
    component: createDocsPage,
    meta: { title: "Domo-OG Documentation", description: "Documentation for Domo-OG." },
  },
};

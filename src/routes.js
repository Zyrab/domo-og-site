// src/routes.js
import createLandingPage from "./pages/landing-page.js";
import createDocsPage from "./pages/docs-page.js";
import createHeader from "./components/layout/header/header.js";
import createFooter from "./components/layout/footer/footer.js";
import createVersionBar from "./components/layout/version-bar/version-bar.js";

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
    },
  },
  "/docs": {
    component: createDocsPage,
    meta: { title: "Domo-OG Documentation", description: "Documentation for Domo-OG." },
  },
};

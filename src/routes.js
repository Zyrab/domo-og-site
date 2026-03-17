// src/routes.js
import createLandingPage from "./pages/landing-page.js";
import createDocsPage from "./pages/docs-page.js";

const routes = {
    "/": {
        component: createLandingPage,
        meta: { title: "Domo-OG - A blazing-fast Open Graph image generator", description: "Design with data, not DOM nodes." },
    },
    "/docs": {
        component: createDocsPage,
        meta: { title: "Domo-OG Documentation", description: "Documentation for Domo-OG." },
    },
};

export default routes;

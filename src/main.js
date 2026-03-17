// src/main.js
import Domo from "@zyrab/domo";
import Router from "@zyrab/domo-router";
import routes from "./routes.js";

function initApp() {
    Router.routes(routes);
    Router.listen(({ meta }) => {
        document.title = meta?.title || "Domo-OG";
        window.scrollTo(0, 0);
    });
    Router.init();
    Router.mount();
}

initApp();

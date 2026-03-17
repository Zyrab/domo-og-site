import Domo from "@zyrab/domo";
import createBadge from "../../ui/badge/badge.js";
import createCodeCopy from "../../composed/code-copy.js";
import getLocales from "../../../assets/locales/get-locale.js";

export default function createVersionBar() {
  const t = getLocales("en", "version_bar");
  return Domo("div")
    .cls("version-bar")
    .child([
      Domo("div")
        .cls("version-bar__container")
        .child([
          Domo()
            .cls("version-bar__cmd")
            .child([
              Domo("span").txt("$").cls("version-bar_dolar"),
              Domo("span").txt(t.npm),
              createCodeCopy(t.code_copy),
            ]),
          createBadge(t.badge),
        ]),
    ]);
}

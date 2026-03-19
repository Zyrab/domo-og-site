/* src/components/ui/markdown/markdown.js */
import Domo from "@zyrab/domo";
import { parseBlocks } from "./parse-blocks.js";

export default function createMarkdown({ content }) {
    return Domo("div")
        .cls("markdown-body")
        .child(parseBlocks(content))
}
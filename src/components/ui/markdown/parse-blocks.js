import Domo from "@zyrab/domo";
import { parseInline } from "./parse-inline.js";
import { parseCode } from "./parse-code.js";

// Helpers
const isBlank = (line) => !line.trim();
const parseUntil = (lines, startIndex, isEnd) => {
  const content = [];
  let i = startIndex;
  while (i < lines.length && !isEnd(lines[i])) content.push(lines[i++]);
  return { content, nextIndex: i };
};
const createListItem = (content) => Domo("li").cls("md-li").child(parseInline(content.trim()));

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export function parseBlocks(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;
  let paragraph = [];
  let ulItems = [];
  let olItems = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push(
        Domo("p")
          .cls("md-p")
          .child(parseInline(paragraph.join("\n")))
      );
      paragraph = [];
    }
  };
  const flushUl = () => {
    if (ulItems.length) {
      blocks.push(Domo("ul").cls("md-ul").child(ulItems));
      ulItems = [];
    }
  };
  const flushOl = () => {
    if (olItems.length) {
      blocks.push(Domo("ol").cls("md-ol").child(olItems));
      olItems = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushUl();
    flushOl();
  };

  while (i < lines.length) {
    const line = lines[i];

    // --- Table ---
    if (line.trim().startsWith("|") && lines[i + 1]?.trim().match(/^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/)) {
      flushAll();
      const getCells = (l) => {
        const row = l.trim().replace(/^\||\|$/g, "");
        const cells = [];
        let current = "";
        let escaped = false;
        
        for (let j = 0; j < row.length; j++) {
          const char = row[j];
          if (escaped) {
             current += char;
             escaped = false;
          } else if (char === "\\") {
             escaped = true;
          } else if (char === "|") {
             cells.push(current.trim());
             current = "";
          } else {
             current += char;
          }
        }
        cells.push(current.trim());
        return cells;
      };

      const headers = getCells(line);
      const alignments = getCells(lines[i + 1]).map(s => {
        if (s.startsWith(":") && s.endsWith(":")) return "center";
        if (s.endsWith(":")) return "right";
        return "left";
      });

      const tableRows = [];
      tableRows.push(
        Domo("tr").child(headers.map((h, idx) =>
          Domo("th").cls("md-th").css({ textAlign: alignments[idx] }).child(parseInline(h))
        ))
      );

      i += 2; // Skip header and separator
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const actualCells = getCells(lines[i]);

        tableRows.push(
          Domo("tr").child(actualCells.map((c, idx) =>
            Domo("td").cls("md-td").css({ textAlign: alignments[idx] }).child(parseInline(c))
          ))
        );
        i++;
      }
      blocks.push(Domo("div").cls("table-wrapper").child([Domo("table").cls("md-table").child([tableRows])]));
      continue;
    }

    // --- Code Block ---
    let match = line.match(/^```(\w*)\s*$/);
    if (match) {
      flushAll();
      const lang = match[1] || null;
      const { content, nextIndex } = parseUntil(lines, i + 1, (l) => /^```\s*$/.test(l));
      blocks.push(parseCode(content.join("\n"), lang));
      i = nextIndex + 1;
      continue;
    }

    // --- Custom Block ---
    match = line.match(/^:::\s*(\w+)\s*$/);
    if (match) {
      flushAll();
      const type = match[1];
      const { content, nextIndex } = parseUntil(lines, i + 1, (l) => /^:::\s*$/.test(l));
      blocks.push(
        Domo("div")
          .cls(["custom-block", `custom-${type}`])
          .child(parseInline(content.join("\n")))
      );
      i = nextIndex + 1;
      continue;
    }

    // --- Heading ---
    match = line.match(/^(#{1,6})\s+(.*\S.*)/);
    if (match) {
      flushAll();
      const level = match[1].length;
      const contentText = match[2];
      const id = slugify(contentText);
      blocks.push(
        Domo(`h${level}`)
          .cls(`md-h${level}`)
          .id(id)
          .child(parseInline(contentText))
      );
      i++;
      continue;
    }

    // --- Horizontal Rule ---
    if (/^ {0,3}([-*_])(?:\s*\1){2,}\s*$/.test(line)) {
      flushAll();
      blocks.push(Domo("hr").cls("md-hr"));
      i++;
      continue;
    }

    // --- Blockquote ---
    if (/^ {0,3}>\s?/.test(line)) {
      flushAll();
      const quoteLines = [];
      while (i < lines.length && /^ {0,3}>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^ {0,3}>\s?/, ""));
        i++;
      }
      blocks.push(
        Domo("blockquote")
          .cls("md-blockquote")
          .child(parseInline(quoteLines.join("\n")))
      );
      continue;
    }

    // --- Image ---
    match = line.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (match) {
      flushAll();
      const [_, alt, src] = match;
      blocks.push(Domo("img").cls("md-img").attr({ src, alt, loading: "lazy" }));
      i++;
      continue;
    }

    // --- Unordered List Item ---
    match = line.match(/^(\s*)[-*+]\s+(.*)/);
    if (match) {
      flushOl();
      ulItems.push(createListItem(match[2]));
      i++;
      continue;
    }

    // --- Ordered List Item ---
    match = line.match(/^(\s*)(\d+)[.)]\s+(.*)/);
    if (match) {
      flushUl();
      olItems.push(createListItem(match[3]));
      i++;
      continue;
    }

    // --- Paragraph / Blank Line ---
    if (isBlank(line)) {
      flushAll();
    } else {
      paragraph.push(line);
    }

    i++;
  }

  flushAll();
  return blocks;
}

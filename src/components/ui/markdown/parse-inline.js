import Domo from "@zyrab/domo";

// {{Name::Type}}
// {{HighlightTag}} - Uses negative lookahead to avoid matching {{Name::Type}}
// [Link Text](URL) - Improved URL matching to grab non-space/non-) characters.
// [[bracketed]]
// **Bold**
// __Underline__
// ~~Strike~~
// ^^Highlight^^
// `Inline Code` - Basic version, doesn't handle escaped/nested backticks.
// *Italic* - Tries to avoid matching '*' inside bold or adjacent to spaces.

export function parseInline(text) {
  if (text === null || text === undefined || text === "") {
    return [];
  }

  // Define patterns using named capture groups.
  // Order matters: More specific or potentially conflicting patterns first.
  const patterns = [
    // {{Name::Type}}
    /(?<tagWithType>\{\{(?<tagWithType_name>.+?)::(?<tagWithType_type>.+?)\}\})/,
    // {{HighlightTag}} - Uses negative lookahead to avoid matching {{Name::Type}}
    /(?<highlightTag>\{\{(?!.+::)(?<highlightTag_content>.+?)\}\})/,
    // [Link Text](URL) - Improved URL matching to grab non-space/non-) characters.
    /(?<markdownLink>\[(?<markdownLink_text>.+?)\]\((?<markdownLink_url>[^\s\)]+)\))/,
    // [[bracketed]]
    /(?<bracketed>\[\[(?<bracketed_content>.+?)\]\])/,
    // **Bold**
    /(?<bold>\*\*(?<bold_content>.+?)\*\*)/,
    // __Underline__
    /(?<underline>__(?<underline_content>.+?)__)/,
    // ~~Strike~~
    /(?<strike>~~(?<strike_content>.+?)~~)/,
    // ^^Highlight^^
    /(?<highlight>\^\^(?<highlight_content>.+?)\^\^)/,
    // `Inline Code` - Basic version, doesn't handle escaped/nested backticks.
    /(?<inlineCode>\`(?<inlineCode_content>.+?)\`)/,
    // *Italic* - Tries to avoid matching '*' inside bold or adjacent to spaces.
    /(?<italic>\*(?![*\s])(?<italic_content>.+?)(?<![*\s])\*)/,
  ];

  // Combine all patterns into a single global regex
  const combinedRegex = new RegExp(patterns.map((r) => r.source).join("|"), "g");

  const results = [];
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      results.push(text.substring(lastIndex, match.index));
    }

    const groups = match.groups;

    // {{Name::Type}}
    if (groups.tagWithType !== undefined) {
      results.push(
        Domo("span")
          .cls("highlight-tag")
          .css({
            color: groups.tagWithType_type,
          })
          .txt(groups.tagWithType_name)
      );
      // {{HighlightTag}}
    } else if (groups.highlightTag !== undefined) {
      results.push(Domo("span").cls("highlight-tag").txt(groups.highlightTag_content));
      // [Link Text](URL)
    } else if (groups.markdownLink !== undefined) {
      const colors = ["#00FFFF", "#3498db", "#ffd700", "#ee82ee", "#66BB6A", "#EB4888"];
      const i = Math.floor(Math.random() * colors.length);
      results.push(
        Domo("a")
          .css({ textDecorationColor: colors[i] })
          .cls("underline-text inherit")
          .attr({
            href: groups.markdownLink_url,
            target: "_blank",
            rel: "noopener noreferrer",
          })
          .txt(groups.markdownLink_text)
      );
      // [[bracketed]]
    } else if (groups.bracketed !== undefined) {
      results.push(Domo("span").cls("brackets-highlight").txt(groups.bracketed_content));
      // **Bold**
    } else if (groups.bold !== undefined) {
      results.push(Domo("b").cls("bold").txt(groups.bold_content));
      // __Underline__
    } else if (groups.underline !== undefined) {
      results.push(Domo("u").cls("underline-text").txt(groups.underline_content));
      // ~~Strike~~
    } else if (groups.strike !== undefined) {
      results.push(Domo("s").cls("strikethrough").txt(groups.strike_content));
      // ^^Highlight^^
    } else if (groups.highlight !== undefined) {
      results.push(Domo("mark").cls("highlight").txt(groups.highlight_content));
      // `Inline Code`
    } else if (groups.inlineCode !== undefined) {
      results.push(Domo("code").cls("inline-code").txt(groups.inlineCode_content));
      // *Italic*
    } else if (groups.italic !== undefined) {
      results.push(Domo("i").cls("italic").txt(groups.italic_content));
    }

    lastIndex = combinedRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    results.push(text.substring(lastIndex));
  }

  //  Handle the case where input was non-empty but produced no results
  // (e.g., if the input text only contained characters used as markers but not forming valid patterns)
  if (results.length === 0 && text.length > 0) {
    return [text]; // Return the original text as a single string element in an array
  }

  return results; // Return the array mix of strings and Domo elements
}

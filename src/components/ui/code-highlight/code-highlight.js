import Domo from "@zyrab/domo";

export default function createCodeHighlight(props = {}) {
  const { code = "" } = props;

  // Simple tokenizer logic
  const children = [];
  const regex = /("[^"]*")|(\/\/.*)|\b(import|from|await|export|const|function)\b|([\{\}\[\]\(\),;:\.])/g;

  let match;
  let currentIndex = 0;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > currentIndex) {
      children.push(Domo("span").txt(code.substring(currentIndex, match.index)));
    }

    if (match[1]) {
      children.push(Domo("span").cls("token-string").txt(match[1]));
    } else if (match[2]) {
      children.push(Domo("span").cls("token-comment").txt(match[2]));
    } else if (match[3]) {
      children.push(Domo("span").cls("token-keyword").txt(match[3]));
    } else if (match[4]) {
      children.push(Domo("span").cls("token-operator").txt(match[4]));
    }

    currentIndex = regex.lastIndex;
  }

  if (currentIndex < code.length) {
    children.push(Domo("span").txt(code.substring(currentIndex)));
  }

  const el = Domo("pre").cls("code-highlight").child(children);

  return el;
}

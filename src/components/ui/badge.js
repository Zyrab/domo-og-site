import Domo from "@zyrab/domo";

export default function Badge(props = {}) {
  const { variant = "yellow", size = "sm", className, label = "", children = [], ...rest } = props;

  const el = Domo("span").cls(`badge badge-${variant} badge-${size}`).attr(rest);

  const content = [...children, label ? Domo("span").txt(label) : null].filter(Boolean);

  el.child(content);

  return el;
}

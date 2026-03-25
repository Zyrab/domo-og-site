import Domo from "@zyrab/domo";

export default function Button({
  variant = "primary",
  cls = "",
  label = "",
  type = "button",
  disabled = false,
  href = null,
  target = "",
  onClick = null,
  child = [],
  ...rest
}) {
  const tag = href ? "a" : "button";

  const variants = {
    primary: "btn-physical btn-primary",
    dark: "btn-physical btn-dark",
    pink: "btn-physical btn-pink",
    outline: "btn-physical btn-outline",
    link: "btn-link",
    "nav-link": "btn-nav-link",
    "sidebar-link": "btn-sidebar-link",
  };

  // 1. Determine if we are in "Icon Only" mode
  const isIconOnly = !label && child.length > 0;

  const el = Domo(tag)
    .cls(`btn ${variants[variant]} ${cls}`)
    .attr({
      ...(tag === "a" ? { href, role: "button", target } : { type }),
      ...(disabled && tag === "button" ? { disabled: "" } : {}),
      // 2. Spread rest early so manual aria-labels can be overridden if needed
      ...rest,
    });

  // 3. Automatic Accessibility Safeguard
  // If there's no text label, we MUST have an aria-label.
  // If the user forgot to provide one in ...rest, we can't guess the intent,
  // but we can ensure the attribute exists or warn.
  if (isIconOnly && !rest["aria-label"]) {
    console.warn("Accessible name missing for icon-only button. Please provide an 'aria-label' in props.");
  }

  if (tag === "a" && disabled) {
    el.attr({ "aria-disabled": "true", tabindex: "-1" });
  }

  const content = [...child, label ? Domo("span").txt(label) : null].filter(Boolean);
  el.child(content);

  if (onClick && !disabled) el.on("click", onClick);

  return el;
}

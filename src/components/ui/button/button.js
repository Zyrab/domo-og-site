import Domo from "@zyrab/domo";

const buttonVariants = {
  base: "btn",
  variants: {},
  defaultVariants: {
    variant: "primary",
  },
};

function getClasses({ variant, className }) {
  const v = variant || buttonVariants.defaultVariants.variant;

  return [buttonVariants.base, buttonVariants.variants.variant[v], className].filter(Boolean).join(" ");
}

export default function Button({
  variant = "primary",
  className,
  label = "",
  type = "button",
  disabled = false,
  href = null,
  onClick = null,
  child = [],
  ...rest
}) {
  const tag = href ? "a" : "button";

  const variants = {
    primary: "btn-physical btn-primary",
    dark: "btn-physical btn-dark",
    outline: "btn-physical btn-outline",
    link: "btn-link",
    "nav-link": "btn-nav-link",
    "sidebar-link": "btn-sidebar-link",
  };
  const el = Domo(tag)
    .cls(`btn ${variants[variant]}`)
    .attr({
      ...(tag === "a" ? { href, role: "button" } : { type }),
      ...(disabled && tag === "button" ? { disabled: "" } : {}),
      ...rest,
    });

  if (tag === "a" && disabled) {
    el.attr({ "aria-disabled": "true", tabindex: "-1" });
  }

  const content = [...child, label ? Domo("span").txt(label) : null].filter(Boolean);

  el.child(content);

  if (onClick && !disabled) el.on("click", onClick);

  return el;
}

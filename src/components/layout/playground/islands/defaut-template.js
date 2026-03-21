export const defultTemplate = {
  background: {
    type: "image",
    src: "assets/preview-images/blog-bg.webp",
  },
  elements: [
    {
      type: "text",
      content: "{{title}}",
      horizontalAlign: "left",
      verticalAlign: "top",
      fontSize: 72,
      color: "#FFFFFF",
      padding: 80,
      width: 700,
    },
    {
      type: "image",
      src: "assets/preview-images/blog-profile.webp",
      horizontalAlign: "right",
      verticalAlign: "middle",
      width: 240,
      height: 240,
    },
    {
      type: "text",
      content: "{{author_name}}",
      horizontalAlign: "right",
      verticalAlign: "bottom",
      padding: 20,
      fontSize: 24,
      color: "#E9FA00",
    },
  ],
};

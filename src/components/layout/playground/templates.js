export const templates = {
  blog: {
    background: {
      type: "image",
      src: "src/assets/preview-images/blog-bg.webp",
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
        width: 700
      },
      {
        type: "image",
        src: "src/assets/preview-images/blog-profile.webp",
        horizontalAlign: "right",
        verticalAlign: "middle",
        width: 240,
        height: 240
      },
      {
        type: "text",
        content: "{{author_name}}",
        horizontalAlign: "right",
        verticalAlign: "bottom",
        padding: 20,
        fontSize: 24,
        color: "#E9FA00"
      }
    ]
  },
  store: {
    background: { type: "image", src: "src/assets/preview-images/store-bg.webp" },
    elements: [
      { type: "image", src: "{{product_url}}", horizontalAlign: "center", verticalAlign: "middle", width: 500, height: 500 },
      { type: "text", content: "{{price}}", horizontalAlign: "right", verticalAlign: "top", padding: 40, fontSize: 48, color: "#FFFFFF", backgroundColor: "#FF4500", borderRadius: 50, bgPadding: 20 },
      { type: "text", content: "{{brand_name}}", horizontalAlign: "left", verticalAlign: "top", padding: 40, fontSize: 24, color: "#333333" }
    ]
  },
  saas: {

    background: { type: "image", src: "src/assets/preview-images/docs-dark-bg.webp" },
    elements: [
      { type: "text", content: "v{{version}}", horizontalAlign: "left", verticalAlign: "top", padding: 40, fontSize: 20, color: "#00FFCC", backgroundColor: "#1A3A3A", borderRadius: 5, bgPadding: 10 },
      { type: "text", content: "{{feature_title}}", horizontalAlign: "left", verticalAlign: "middle", padding: 60, fontSize: 80, color: "#FFFFFF", width: 800 },
      { type: "image", src: "{{feature_icon}}", horizontalAlign: "right", verticalAlign: "middle", padding: 60, width: 200, height: 200 }
    ]

  }, event: {
    background: { type: "image", src: "src/assets/preview-images/event-mesh.webp" },
    elements: [
      { type: "text", content: "LIVE: {{event_date}}", horizontalAlign: "center", verticalAlign: "top", padding: 50, fontSize: 32, color: "#000000", backgroundColor: "#FFFFFF", borderRadius: 8, bgPadding: 15 },
      { type: "text", content: "{{event_title}}", horizontalAlign: "center", verticalAlign: "middle", fontSize: 90, color: "#FFFFFF", maxLength: 15 },
      { type: "text", content: "Join {{speaker_name}}", horizontalAlign: "center", verticalAlign: "bottom", padding: 50, fontSize: 36, color: "#FFFFFF" }
    ]
  },
  news: {
    background: { type: "image", src: "{{news_photo_url}}" },
    elements: [
      { type: "text", content: "BREAKING NEWS", horizontalAlign: "left", verticalAlign: "bottom", padding: 180, fontSize: 24, color: "#FFFFFF", backgroundColor: "#FF0000", bgPadding: 10 },
      { type: "text", content: "{{headline}}", horizontalAlign: "left", verticalAlign: "bottom", padding: 60, fontSize: 54, color: "#FFFFFF", backgroundColor: "rgba(0,0,0,0.7)", width: 1080, bgPadding: 20 }
    ]
  }
};

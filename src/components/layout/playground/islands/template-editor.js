import Domo from "@zyrab/domo";
import createInput from "../../../ui/input.js";
import createSelect from "../../../ui/select.js";
import createButton from "../../../ui/button.js";
import createAccordion from "../../../ui/accordion.js";
import createTemplatePreview from "./preview/template-preview.js";
import createTemplateCode from "./template-code.js";

export default function createTemplateEditor(template) {
  let localTemplate = template;
  let editorRef = null;
  let openAccordionLabel = "Global Settings"; // Track open accordion

  function notifyChange() {
    if (editorRef) {
      const canvasView = document.getElementById("preview-canvas");
      const codeView = document.getElementById("template-code");

      canvasView.replaceWith(createTemplatePreview(localTemplate).build());
      codeView.replaceWith(createTemplateCode(localTemplate).cls("hidden").build());
    }
  }

  function handleInput(e) {
    const target = e.target;
    if (!target.name) return;

    const { name, value, type } = target;
    const finalValue = type === "number" ? (value === "" ? undefined : parseInt(value, 10)) : value;

    if (name.startsWith("bg-")) {
      const bgField = name.split("-")[1];
      localTemplate.background[bgField] = finalValue;

      // Re-render when background type switches to swap input types
      if (bgField === "type") {
        if (finalValue === "image") {
          localTemplate.background.src = localTemplate.background.value || "";
          delete localTemplate.background.value;
        } else {
          localTemplate.background.value = localTemplate.background.src || "#ffffff";
          delete localTemplate.background.src;
        }
        render();
        return;
      }
    } else if (name.startsWith("el-")) {
      const parts = name.split("-");
      const index = parseInt(parts[1], 10);
      const field = parts.slice(2).join("-");

      localTemplate.elements[index][field] = finalValue;

      // Re-render if switching type to adjust available fields
      if (field === "type") {
        render();
        return;
      }
    }
    notifyChange();
  }

  function addElement() {
    localTemplate.elements.push({
      type: "text",
      content: "New Text",
      color: "#000000",
      fontSize: 32,
      padding: 20,
    });
    notifyChange();
    render();
  }

  function renderElementsList() {
    return Domo("div")
      .cls("element-list accordion-group")
      .child(
        localTemplate.elements.map((el, i) => {
          const label = `Element ${i + 1}: ${el.type}`;
          return createAccordion({
            label,
            group: "editor-elements",
            isOpen: openAccordionLabel === label,
            children: [
              createSelect({
                label: `Type`,
                options: [
                  { value: "text", label: "Text" },
                  { value: "image", label: "Image" },
                ],
                value: el.type,
                name: `el-${i}-type`,
              }),
              ...(el.type === "text"
                ? [
                  createInput({ label: "Content", type: "text", value: el.content || "", name: `el-${i}-content` }),
                  Domo("div").cls("element-row").child([
                    createInput({ label: "Color", type: "color", value: el.color || "#000000", name: `el-${i}-color` }),
                    createInput({ label: "BG Color", type: "color", value: el.backgroundColor || "transparent", name: `el-${i}-backgroundColor` }),
                  ]),
                  Domo("div").cls("element-row").child([
                    createInput({ label: "Width", type: "number", value: el.width || "", name: `el-${i}-width` }),
                    createInput({ label: "Font Size", type: "number", value: el.fontSize || 32, name: `el-${i}-fontSize` }),
                  ]),
                  Domo("div").cls("element-row").child([
                    createInput({ label: "Max Length", type: "number", value: el.maxLength || "", name: `el-${i}-maxLength` }),
                    createInput({ label: "BG Padding", type: "number", value: el.bgPadding || 0, name: `el-${i}-bgPadding` }),
                  ]),

                ]
                : [
                  createInput({ label: "Image URL", type: "text", value: el.src || "", name: `el-${i}-src` }),
                  Domo("div").cls("element-row").child([
                    createInput({ label: "Width", type: "number", value: el.width || "", name: `el-${i}-width` }),
                    createInput({ label: "Height", type: "number", value: el.height || "", name: `el-${i}-height` }),
                  ]),
                ]),
              Domo("div").cls("element-row").child([
                createSelect({
                  label: "H-Align",
                  options: [
                    { value: "left", label: "Left" },
                    { value: "center", label: "Center" },
                    { value: "right", label: "Right" },
                  ],
                  value: el.horizontalAlign || "left",
                  name: `el-${i}-horizontalAlign`,
                }),
                createSelect({
                  label: "V-Align",
                  options: [
                    { value: "top", label: "Top" },
                    { value: "middle", label: "Middle" },
                    { value: "bottom", label: "Bottom" },
                  ],
                  value: el.verticalAlign || "top",
                  name: `el-${i}-verticalAlign`,
                }),
              ]),
              Domo("div").cls("element-row").child([
                createInput({ label: "Padding", type: "number", value: el.padding || 0, name: `el-${i}-padding` }),
                createInput({ label: "Border Radius", type: "number", value: el.borderRadius || 0, name: `el-${i}-borderRadius` }),
              ]),

            ],
          }).on("click", () => (openAccordionLabel = label));
        }),
      );
  }

  function render() {
    if (!editorRef) return;
    editorRef.replaceChildren(
      Domo("div")
        .cls("playground-form")
        .child([
          createAccordion({
            label: "Global Settings",
            group: "editor-elements",
            isOpen: openAccordionLabel === "Global Settings",
            children: [
              createSelect({
                label: "Background Type",
                options: [
                  { value: "color", label: "Color" },
                  { value: "image", label: "Image" },
                ],
                value: localTemplate.background?.type || "color",
                name: "bg-type",
              }),
              createInput({
                label: localTemplate.background?.type === "image" ? "Background URL" : "Background Color",
                type: localTemplate.background?.type === "color" ? "color" : "text",
                value:
                  localTemplate.background?.type === "image"
                    ? localTemplate.background?.src || ""
                    : localTemplate.background?.value || "#ffffff",
                name: localTemplate.background?.type === "image" ? "bg-src" : "bg-value",
              }),

            ],
          }).on("click", () => (openAccordionLabel = "Global Settings")),
          Domo("div")
            .cls("flex gap-sm items-center")
            .css({ justifyContent: "space-between", padding: "0 16px" })
            .child([
              Domo("h4").cls("form-label").css({ margin: 0 }).txt("Elements"),
              createButton({ label: "Add Element", variant: "dark" }).cls("btn-add-element"),
            ]),
          renderElementsList(),
        ])

        .build(),
    );
  }

  return Domo("div")
    .cls("playground__pane-content playground-editor-container")
    .id("template-editor")
    .on("input", handleInput)
    .on("change", handleInput)
    .onClosest("click", { ".btn-add-element": addElement })
    .ref((el) => {
      editorRef = el;
      render();
    });
}

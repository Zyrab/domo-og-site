# @zyrab/domo-og

A blazing-fast, cross-platform, config-driven Open Graph (OG) image generator for Node.js.

## Introduction

`@zyrab/domo-og` is a modern utility to dynamically generate high-quality Open Graph images for your websites, blogs, and applications.

Historically, generating SVGs and converting them to PNGs required OS-specific binaries or heavy headless browsers like Puppeteer. `@zyrab/domo-og` solves this by utilizing WebAssembly ([@resvg/resvg-wasm](https://www.npmjs.com/package/@resvg/resvg-wasm)). It runs perfectly across Windows, macOS, and Linux without complex native dependencies.

Furthermore, instead of wrestling with messy raw SVG strings, you design your images using clean, readable JSON configuration objects.

## Why Domo-OG?

When it comes to automated Open Graph image generation, speed matters—especially for static site generators (SSG) that might need to build thousands of pages.

*   **Puppeteer / Playwright:** Spin up an entire headless Chromium browser just to take a screenshot. Infamously slow (1-3 seconds per image), resource-intensive, and prone to memory leaks.
*   **Satori:** Relies on a custom React/HTML/CSS parsing engine (Yoga) in JavaScript to convert layouts into SVGs. Heavily CPU-bound.
*   **Domo-OG:** Uses a completely different approach. By taking a simple JSON config, we bypass HTML/CSS layout engines and DOM parsing entirely. The JSON is instantly mapped onto a flat SVG canvas and immediately handed off to a high-performance Rust engine to render the PNG.

### Benchmark Results

*Tested on an Intel(R) Core(TM) i5-8265U CPU @ 1.60GHz (8 Cores, Node v22.19.0)*

| Test Condition | Iterations | Avg Time per Image | Total Time |
| :--- | :--- | :--- | :--- |
| Simple Template (Cold) | 200 | ~33 ms | 6.7s |
| Complex Template (Remote Image) | 50 | ~43 ms | 2.1s |
| Simple Template (Cache Hit) | 200 | ~29 ms | 5.8s |

> [!NOTE]
> Cache hits skip rendering entirely, safely fetching from disk.

## Key Features

- ⚡ **WASM Powered Engine:** Cross-platform compatibility out of the box. No OS-specific binary downloads.
- 🛠️ **Config-Driven Templates:** Define layouts, backgrounds, text, and images via simple JavaScript objects.
- 💉 **Dynamic Data Injection:** Easily swap variables like `{{title}}` or `{{author}}` at build time.
- 📐 **Smart Text Wrapping:** Automatically calculates text line-breaks and multi-line positioning.
- 💾 **Built-in Caching:** Prevents redundant generation with an internal `og-cache.json` manifest, drastically speeding up builds.
- 🌐 **Remote Image Fetching:** Safely fetches and caches remote background/element images with built-in limits.

## Installation

Install the package using your preferred package manager:

```bash
npm install @zyrab/domo-og
```
- or
```bash
yarn add @zyrab/domo-og
```
- or
```bash
pnpm add @zyrab/domo-og
```

## Quick Start

Here is a basic example of generating an OG image for a blog post. By default, the generator uses a built-in template and handles relative project paths automatically.

```javascript
import { generateOgImage } from "@zyrab/domo-og";

async function build() {
  const imagePath = await generateOgImage({
    slug: "my-first-post",           // Used for caching and file naming
    ogOutputPath: "public",          // Where the assets/og-images folder will be created
    title: "My Awesome First Post!", // Injects into {{title}} in the template
    template: { 
    background: {
      type: "color",
      value: "#40C4FF"
    },
    elements: [
      {
        type: "text",
        content: "{{title}}",
        fontSize:  120,
      }
    ] 
  },          
  });

  console.log(`Generated successfully at: ${imagePath}`);
}

build();
```

## Configuration API (Templates)

Templates in Domo-OG are just JavaScript objects. This eliminates the need to manually manipulate SVG tags.

### Root Configuration

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `width` | `number` | `1200` | The width of the generated image. |
| `height` | `number` | `630` | The height of the generated image. |
| `fontPath` | `string` | `null` | Path or URL to a custom .ttf, .otf, or .woff font. |
| `background` | `object` | `null` | The background layer configuration. |
| `elements` | `array[]` | `[]` | An array of element objects (text or images) to render on top. |

### Background Object

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | `"color"\|"image"` | Defines the type of background. |
| `value` | `string` | The hex/rgb color code (Required if type is "color"). |
| `src` | `string` | Path or URL to the background image (Required if type is "image"). |

## Elements Array Objects

Elements render sequentially (the last element in the array renders on top).

### Text Element

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | `"text"` | Identifies the element type. |
| `content` | `string` | The text to display. Supports variables e.g., `{{title}}`. |
| `width` | `number` | The width of the text element. |
| `maxLength` | `number` | The maximum length of the text element before wrapping. |
| `horizontalAlign` | `"left"\|"center"\|"right"` | Horizontal alignment based on padding/width. |
| `verticalAlign` | `"top"\|"middle"\|"bottom"` | Vertical alignment based on padding/height. |
| `fontSize` | `number` | Font size in pixels (Default: 32). |
| `color` | `string` | Hex/rgb text color. |
| `backgroundColor` | `string` | Adds a highlighted background box behind the text. |
| `borderRadius` | `number` | Border radius for the text background box. |
| `padding` | `number` | Distance from the edges of the canvas. |
| `bgPadding` | `number` | Padding between the text and its own backgroundColor box. |

### Image Element

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | `"image"` | Identifies the element type. |
| `src` | `string` | Local path or remote URL to the image. |
| `width` | `number` | Width of the image (Default: 100). |
| `height` | `number` | Height of the image (Default: 100). |
| `horizontalAlign` | `"left"\|"center"\|"right"` | Horizontal alignment on the canvas. |
| `verticalAlign` | `"top"\|"middle"\|"bottom"` | Vertical alignment on the canvas. |
| `padding` | `number` | Distance from the edges of the canvas. |

## Advanced Usage

### Advanced Template Example

Here is an advanced template showcasing dynamic data, remote images, and custom styling:

```javascript
const advancedTemplate = {
  width: 1200,
  height: 630,
  background: {
    type: "color",
    value: "#1a1a1a",
  },
  elements: [
    {
      type: "image",
      src: "https://example.com/mock-logo.png", // Mock remote image
      horizontalAlign: "left",
      verticalAlign: "top",
      padding: 40,
      width: 80,
      height: 80,
    },
    {
      type: "text",
      content: "{{category}}", // Dynamic variable
      horizontalAlign: "left",
      verticalAlign: "top",
      padding: 140, // Pushed down below the logo
      fontSize: 24,
      color: "#000000",
      backgroundColor: "#E9FA00",
      bgPadding: 8,
      borderRadius: 4,
    },
    {
      type: "text",
      content: "{{title}}", // Dynamic variable
      horizontalAlign: "center",
      verticalAlign: "middle",
      fontSize: 64,
      color: "#FFFFFF",
      maxLength: 20 // Forces line breaks after ~20 characters
    }
  ]
};
```

## Fonts & Fallbacks

The WASM rendering engine requires a valid `.ttf`, `.otf`, or `.woff` font file to render text. `@zyrab/domo-og` handles this intelligently:

1.  **Explicit URL/Path:** If you provide `fontPath` in your config, it will fetch/load it.
2.  **Local Assets:** It will automatically scan `${ogOutputPath}/assets/fonts/` for any valid font file.
3.  **Internal Fallback:** If neither are found, it safely falls back to a default font bundled within the package (`fonts/default.ttf`).

## Remote Image Security & Limits

To protect your build processes from memory leaks and hang-ups:

-   Remote images have a strict **20MB** size limit.
-   The package uses a custom User-Agent: `Domo-OG-Builder/1.0`. Ensure you whitelist this User-Agent if your server blocks unknown agents.

## Core API Reference

### `generateOgImage(options)`

The primary workhorse of the package. It builds the SVG, renders it to PNG, and manages the cache.

**Options:**

*   `slug` (String, Required): A unique identifier for the image (often the URL slug).
*   `ogOutputPath` (String, Required): Output directory (e.g., "public"). Images are saved into `${ogOutputPath}/assets/og-images/`.
*   `template` (Object, Optional): Your config template. Falls back to default if omitted.
*   `routeKey` (String, Optional): An alternative key for hashing/caching.
*   `...flatParams`: Any other key will be injected (e.g., `title: "Hello"` replaces `{{title}}`).

**Returns:** `Promise<String>`: The relative path to the generated PNG.

### `getDefaultConfig()`

Returns a clean, modern, dark-themed default configuration object.

### `flushManifestImmediately()`

Forces the caching manifest (`og-cache.json`) to write to the disk immediately.

## License & Acknowledgements

`@zyrab/domo-og` is licensed under the MIT License.

**Engine Acknowledgment:**
This package relies on the fantastic `@resvg/resvg-wasm` for rendering SVGs to PNGs via WebAssembly. Please refer to their respective repositories for detailed licensing information.
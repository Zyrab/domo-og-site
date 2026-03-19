import fs from "fs";
import { resolve } from "path";

export const fetchJson = async (path) => {
  try {
    const filePath = resolve(process.cwd(), path.replace(/^\/+/, ""));
    const content = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error fetching JSON:", error);
    return null;
  }
};

export const fetchText = async (path) => {
  try {
    const filePath = resolve(process.cwd(), path.replace(/^\/+/, ""));
    const content = await fs.promises.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error fetching text:", error);
    return null;
  }
};

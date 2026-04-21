import fs from "fs/promises";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

export async function getContent() {
  try {
    const data = await fs.readFile(CONTENT_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading content.json:", error);
    return null;
  }
}

export async function updateContent(newContent: any) {
  try {
    await fs.writeFile(CONTENT_PATH, JSON.stringify(newContent, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error updating content.json:", error);
    return false;
  }
}

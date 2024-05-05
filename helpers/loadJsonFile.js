import { readFile } from "fs/promises";

async function loadJsonFile(filePath) {
  try {
    const jsonData = await readFile(filePath, { encoding: "utf8" });
    return JSON.parse(jsonData);
  } catch (error) {
    throw new Error("Failed to load or parse JSON file: " + error.message);
  }
}

export default loadJsonFile;

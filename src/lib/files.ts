import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

const DATA_DIR = path.resolve("data");

function resolveDataPath(fileName: string): string {
  const filePath = path.resolve(DATA_DIR, fileName);

  if (
    filePath !== DATA_DIR &&
    !filePath.startsWith(`${DATA_DIR}${path.sep}`)
  ) {
    throw new Error("Access to files outside the data directory is not allowed");
  }

  return filePath;
}

export async function readDataFile(fileName: string): Promise<string> {
  const filePath = resolveDataPath(fileName);

  return readFile(filePath, "utf-8");
}

export async function writeDataFile(
  fileName: string,
  content: string,
): Promise<void> {
  const filePath = resolveDataPath(fileName);

  await writeFile(filePath, content, "utf-8");
}
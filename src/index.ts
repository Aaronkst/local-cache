import { writeFile, readFile, access } from "node:fs/promises";
import { writeFileSync, mkdirSync, accessSync } from "node:fs";
import { ICache } from "./index.interface";

const validateFile = async (file: string): Promise<boolean> => {
  try {
    await access(`./cache/${file}.json`);
    return true;
  } catch {
    return false;
  }
};

const validateDirectorySync = (): boolean => {
  try {
    accessSync(`./cache`);
    return true;
  } catch {
    return false;
  }
};

const readJsonFile = async (file: string): Promise<ICache> => {
  const data = await readFile(`./cache/${file}.json`, "utf-8");
  return JSON.parse(data);
};

class LocalCache {
  readonly cache: string;
  //readonly size: string;

  constructor(cache: string) {
    const directory = validateDirectorySync();
    if (!directory) mkdirSync("./cache");
    writeFileSync(`./cache/${cache}.json`, JSON.stringify({}));
    this.cache = cache;
    //this.size = size;
  }

  public async getItem(key: string): Promise<unknown> {
    const isValid = validateFile(this.cache);
    if (!isValid) throw new Error("Unexpected Error");
    const data = await readJsonFile(this.cache);
    return data[key];
  }

  public async setItem(key: string, value: unknown): Promise<boolean> {
    const isValid = validateFile(this.cache);
    if (!isValid) throw new Error("Unexpected Error");
    const data = await readJsonFile(this.cache);
    data[key] = value;
    await writeFile(`./cache/${this.cache}.json`, JSON.stringify(data));
    return true;
  }
}

export = LocalCache;

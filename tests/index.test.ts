import { expect } from "chai";
import { accessSync } from "node:fs";
import LocalCache from "../src/index";

const testCache = (file: string): boolean => {
  try {
    accessSync(`./cache/${file}.json`);
    return true;
  } catch {
    return false;
  }
};

describe("Local Cache", (): void => {
  const localCache = new LocalCache("tokens");
  it("class init", (): void => {
    expect(testCache("tokens")).true;
  });
  it("set item", async (): Promise<void> => {
    const setItem = await localCache.setItem("customerId", "tokenString");
    expect(setItem).true;
  });
  it("get item", async (): Promise<void> => {
    const getItem = await localCache.getItem("customerId");
    console.log("Item:", getItem);
    expect(getItem).to.not.equal(undefined);
  });
});

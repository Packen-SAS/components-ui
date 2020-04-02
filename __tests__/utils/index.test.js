import { arraysEqual } from "../../app/utils";

describe("arraysEqual", () => {
  it("returns true if arrays contain the same items", () => {
    const arr1 = ["Item 1", "Item 2"];
    const arr2 = ["Item 1", "Item 2"];

    expect(arraysEqual(arr1, arr2)).toBe(true);
  });

  it("returns false if arrays don't contain the same items", () => {
    const arr1 = ["Item 1", "Item 2"];
    const arr2 = ["Item 2", "Item 3"];

    expect(arraysEqual(arr1, arr2)).toBe(false);
  });
});
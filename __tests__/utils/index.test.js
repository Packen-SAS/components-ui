import moment from "moment";
import * as UTIL from "../../app/utils";

describe("arraysEqual", () => {
  it("returns true if arrays contain the same items", () => {
    const arr1 = ["Item 1", "Item 2"];
    const arr2 = ["Item 1", "Item 2"];

    expect(UTIL.arraysEqual(arr1, arr2)).toBe(true);
  });

  it("returns false if arrays don't contain the same items", () => {
    const arr1 = ["Item 1", "Item 2"];
    const arr2 = ["Item 2", "Item 3"];

    expect(UTIL.arraysEqual(arr1, arr2)).toBe(false);
  });
});

describe("moment", () => {
  it("returns a formatted time string", () => {
    expect(UTIL.getTime("2021-08-14 5:05:05")).toBe("05:05:05 AM");
  });

  it("returns a formatted datetime string", () => {
    expect(UTIL.getDate(new Date("2021-08-14 5:05:05"))).toBe("14/08/2021 05:05:05 AM");
  });

  it("returns a custom date object", () => {
    expect(UTIL.getDateByChunks(new Date("2021-08-14 5:05:05"), "es")).toEqual({
      month: "Agosto",
      day: "Sábado",
      nday: 14,
      year: 2021,
      time: "05:05:05 AM",
      locale: "es",
      unix: new Date("2021-08-14 5:05:05").getTime()
    });
  });

  it("returns the datetime functions", () => {
    const res = UTIL.datetime();
    expect(res).toBeDefined();
  });

  it("returns the 'plain' datetime", () => {
    expect(UTIL.datetime().plain("2021-08-14")).toBe(UTIL.getDate("2021-08-14"));
  });

  it("returns the 'parts' datetime", () => {
    expect(UTIL.datetime().parts("2021-08-14", "es").toString()).toBe(UTIL.getDateByChunks("2021-08-14", "es").toString());
  });

  it("returns the 'obj' datetime", () => {
    expect(UTIL.datetime().obj("2021-08-14").toString()).toBe(moment("2021-08-14").toString());
  });

  it("returns the 'diff' datetime", () => {
    a = UTIL.toMomentObject(new Date("2021-08-14"));
    b = UTIL.toMomentObject(new Date("2021-08-15"));
    expect(UTIL.datetime().diff(a, b, "days")).toBe(a.diff(b, "days"));
  });

  it("returns a moment object", () => {
    expect(UTIL.toMomentObject("2021-08-14").toString()).toEqual(moment("2021-08-14").toString());
  });

  it("returns a moment object of the current date", () => {
    expect(UTIL.toMomentObject(null).toString()).toEqual(moment(Date.now()).toString());
  });

  it("returns null while trying to format a date if it's undefined", () => {
    expect(UTIL.formatDateSimple(undefined, "DD/MM/YYYY")).toBe(null);
  });

  it("returns a formatted date", () => {
    expect(UTIL.formatDateSimple("2021-08-14", "DD/MM/YYYY")).toBe("14/08/2021");
  });
})

describe("validators", () => {
  it("checks if the provided string is a number", () => {
    expect(UTIL.isNumber("123")).toBe(true);
  });

  it("checks if the provided string is only letters", () => {
    expect(UTIL.isOnlyLetters("qwerty")).toBe(true);
  });

  it("checks if the provided string is only letters and numbers", () => {
    expect(UTIL.isLettersNumbers("123qwerty")).toBe(true);
  });

  it("checks if the provided string is only special characters", () => {
    expect(UTIL.isOnlySpecial("!$#")).toBe(true);
  });

  it("checks if the provided string is a only letters and special characters", () => {
    expect(UTIL.isLettersSpecial("!$#qwerty")).toBe(true);
  });

  it("checks if the provided string is an email", () => {
    expect(UTIL.isEmail("qwerty@asd.com")).toBe(true);
  });

  it("checks if the provided string is an url", () => {
    expect(UTIL.isURL("https://www.asd.com")).toBe(true);
  });
});
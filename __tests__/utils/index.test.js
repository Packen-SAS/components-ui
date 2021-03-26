import moment from "moment";
import * as UTIL from "../../app/utils";
import Colors from "../../app/styles/abstracts/colors";

describe("arraysEqual", () => {
  it('check arrays equality when a len != b len', () => {
    expect(UTIL.arraysEqual([], [1])).toBeFalsy();
  })
  it('check arrays equality when a len == b len, but keys is not equals', () => {
    expect(UTIL.arraysEqual([1, 2], [1, 3])).toBeFalsy();
  })
  it('check arrays equality when a len == b len and keys is equals', () => {
    expect(UTIL.arraysEqual([1, 2], [1, 2])).toBeTruthy();
  })
  it('check arrays equality when a and b contain objects', () => {
    expect(UTIL.arraysEqual([{ test: "test 1" }], [{ test: "test 1" }])).toBeTruthy();
    expect(UTIL.arraysEqual([{ test: "test 1" }], [{ test: "test 2" }])).toBeFalsy();
    expect(UTIL.arraysEqual([{ test: "test 1" }, { test: "test 1" }], [{ test: "test 1" }, { test: "test 2" }])).toBeFalsy();
  })
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
    [null, undefined, false].forEach((val) => {
      expect(UTIL.isNumber(val)).toBe(false);
    });
    [123, "123"].forEach((val) => {
      expect(UTIL.isNumber(val)).toBe(true);
      expect(UTIL.isNumber(val)).toBe(true);
      expect(UTIL.isNumberStr(val)).toBe(true);
    });
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

  it("removes the timezone part of a date string if it's the custom schema from api", () => {
    expect(UTIL.removeTimezone(null)).toBe(null);
    expect(UTIL.removeTimezone("2020-08-27T00:00:00-0500")).toBe("2020-08-27T00:00:00-0500");
    expect(UTIL.removeTimezone("2020-08-27 00:00:00 -05")).toBe("2020/08/27 00:00:00");
    expect(UTIL.removeTimezone("2020-08-27 00:00:00")).toBe("2020/08/27 00:00:00");
  });

  it("converts a hex color code into rgba", () => {
    expect(UTIL.hex2rgba(Colors.brand.primary.snw, .5)).toBe("rgba(231,252,255,0.5)");
    expect(UTIL.hex2rgba(Colors.brand.primary.snw)).toBe("rgba(231,252,255,1)");
  });

  it("converts a number into its corresponding alphabet letter", () => {
    expect(UTIL.num2ltr(1)).toBe("A");
    expect(UTIL.num2ltr(26)).toBe("Z");
    expect(UTIL.num2ltr(undefined)).toBe(null);
  });

  it("returns the correct day format depending on the locale", () => {
    expect(UTIL.getNdayFormat("es", 1)).toBe(" de");
    expect(UTIL.getNdayFormat("en", 1)).toBe("st");
    expect(UTIL.getNdayFormat("en", 2)).toBe("nd");
    expect(UTIL.getNdayFormat("en", 3)).toBe("rd");
    expect(UTIL.getNdayFormat("en", 4)).toBe("th");
  });
});

describe("string formatting", () => {
  it("capitalizes every word in a string", () => {
    expect(UTIL.toTitleCase(null)).toBe(null);
    expect(UTIL.toTitleCase("test")).toBe("Test");
    expect(UTIL.toTitleCase("test más largo")).toBe("Test Más Largo");
    expect(UTIL.toTitleCase("uN tEsT Muy lOCo")).toBe("Un Test Muy Loco");
  });

  it("capitalizes a string", () => {
    expect(UTIL.toCapitalCase(null)).toBe(null);
    expect(UTIL.toCapitalCase("test")).toBe("Test");
    expect(UTIL.toCapitalCase("test más largo")).toBe("Test más largo");
  });
});
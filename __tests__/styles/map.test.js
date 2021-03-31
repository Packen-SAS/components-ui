import PackenUiMapStyles from "../../app/styles/map/style";

describe("Common map styles", () => {
  it("returns the styles object", () => {
    expect(PackenUiMapStyles).toBeDefined();
    expect(PackenUiMapStyles).toBeInstanceOf(Array);
  });
});
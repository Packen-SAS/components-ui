import Typography from "../../app/styles/abstracts/typography";
import Shadows from "../../app/styles/abstracts/shadows";
import Spacing from "../../app/styles/abstracts/spacing";
import Colors from "../../app/styles/abstracts/colors";

describe("Style modules", () => {
  it("returns the typography variables", () => {
    expect(Typography).toBeDefined();
  });

  it("returns the shadows variables", () => {
    expect(Shadows).toBeDefined();
  });

  it("returns the spacing variables", () => {
    expect(Spacing).toBeDefined();
  });

  it("returns the color variables", () => {
    expect(Colors).toBeDefined();
  });
});
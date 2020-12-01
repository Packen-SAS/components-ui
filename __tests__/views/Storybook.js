import Storybook from "../../app/views/Storybook";

jest.mock("@storybook/react-native", () => ({
  getStorybookUI: jest.fn(() => true),
  configure: jest.fn()
}));

describe("Storybook module", () => {
  it("returns the root view", () => {
    expect(Storybook).toBeDefined();
  });
});
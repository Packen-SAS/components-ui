import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import MapPinStyles from "../../app/styles/components/PackenMapPin";
import PackenMapPinSub from "../../app/components/PackenMapPinSub";

describe("<PackenMapPinSub/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = renderer.create(
      <PackenMapPinSub
        type="info"
        theme="primary"
        label="A"
        icon={undefined}
        dotPosition="bottom"
      />
    );

    renderInstance = render.getInstance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("styling", () => {
    it("returns the default color if no 'theme' prop is provided", () => {
      const returnedColor = renderInstance.getIconColor();
      expect(returnedColor).toBe(MapPinStyles.icon.type.icon.color);
    });

    it("returns the correct color if a 'theme' prop is provided", () => {
      renderInstance.props = { theme: "primary" };
      const returnedColor = renderInstance.getIconColor();
      expect(returnedColor).toBe(MapPinStyles.icon.theme.primary.color);
    });
  });
});
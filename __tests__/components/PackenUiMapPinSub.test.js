import "react-native";
import React from "react";
import { shallow } from "enzyme";

import MapPinStyles from "../../app/styles/components/PackenUiMapPin";
import PackenUiMapPinSub from "../../app/components/PackenUiMapPinSub";

describe("<PackenUiMapPinSub/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiMapPinSub
        type="info"
        theme="primary"
        label="A"
        icon={undefined}
        dotPosition="bottom"
      />
    );

    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns icon if set so", () => {
      render.setProps({
        icon: "check"
      });
      const returnedElement = renderInstance.getIcon();

      expect(returnedElement).toBeDefined();
    });

    it("returns null if icon is not set", () => {
      render.setProps({
        icon: undefined
      });
      const returnedElement = renderInstance.getIcon();

      expect(returnedElement).toBe(null);
    });

    it("returns label if set so", () => {
      render.setProps({
        label: "Test",
        theme: "primary"
      });
      const returnedElement = renderInstance.getLabel();

      expect(returnedElement).toBeDefined();
    });

    it("returns null if label is not set", () => {
      render.setProps({
        label: undefined
      });
      const returnedElement = renderInstance.getLabel();

      expect(returnedElement).toBe(null);
    });

    it("returns dot if set so", () => {
      render.setProps({
        dotPosition: "left",
        type: "info"
      });
      const returnedElement = renderInstance.getDot();

      expect(returnedElement).toBeDefined();
    });

    it("returns null if dot is not set", () => {
      render.setProps({
        dotPosition: undefined
      });
      const returnedElement = renderInstance.getDot();

      expect(returnedElement).toBe(null);
    });
  });

  describe("styling", () => {
    it("returns the default color if no 'theme' prop is provided", () => {
      renderInstance.props = { theme: undefined };
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
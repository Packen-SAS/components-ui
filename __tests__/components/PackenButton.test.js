import "react-native";
import React from "react";

import PackenButton from "../../app/components/PackenButton";

import renderer from "react-test-renderer";

describe("<PackenButton/>", () => {
  describe("Rendering", () => {
    it("renders a regular button correctly", () => {
      const regularRender = renderer.create(
        <PackenButton
          icon={{ name: "arrow-right", position: "right" }}
          type="regular"
          level="primary"
          size="medium"
          callback={jest.fn}>Medium</PackenButton>
      ).toJSON();

      expect(regularRender).toMatchSnapshot();
    });

    it("renders an icon button correctly", () => {
      const iconRender = renderer.create(
        <PackenButton
          icon={{ name: "arrow-right-circle" }}
          type="icon"
          level="secondary"
          size="large"
          callback={jest.fn} />
      ).toJSON();
      expect(iconRender).toMatchSnapshot();
    });
  });

  describe("styles", () => {
    const render = renderer.create(
      <PackenButton
        icon={{ name: "arrow-right", position: "right" }}
        type="regular"
        level="primary"
        size="medium"
        callback={jest.fn}>Medium</PackenButton>
    );
    const instance = render.getInstance();

    it("returns current styles", () => {
      expect(instance.get_styles()).toBeDefined();
    });
  });
});
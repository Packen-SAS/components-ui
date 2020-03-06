import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import Typography from "../../app/styles/abstracts/typography";
import PackenText from "../../app/components/PackenText";

describe("<PackenText/>", () => {
  let render, renderInstance, renderJSON;

  beforeAll(() => {
    render = renderer.create(
      <PackenText>Test</PackenText>
    );

    renderInstance = render.getInstance();
    renderJSON = render.toJSON();

    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      }
    };
    renderInstance.setState({
      preset: "h1"
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders content correctly", () => {
      expect(renderJSON.children[0]).toBe("Test");
    });
  });

  describe("styling", () => {
    it("sets correct styles if preset is provided", () => {
      renderInstance.props = { preset: "h1" };
      expect(renderJSON.props.style.fontFamily).toBe(Typography.family.bold);
      expect(renderJSON.props.style.fontSize).toBe(36);
      expect(renderJSON.props.style.lineHeight).toBe(48);
    });
  });
});
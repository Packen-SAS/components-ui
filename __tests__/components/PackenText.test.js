import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import Colors from "../../app/styles/abstracts/colors";
import Typography from "../../app/styles/abstracts/typography";
import PackenText from "../../app/components/PackenText";

describe("<PackenText/>", () => {
  let render, renderNoPreset, renderInstance, renderJSON, renderJSONNoPreset;

  beforeAll(() => {
    render = renderer.create(
      <PackenText preset="h1">Test</PackenText>
    );
    renderNoPreset = renderer.create(
      <PackenText>Test</PackenText>
    );

    renderInstance = render.getInstance();
    renderJSON = render.toJSON();
    renderJSONNoPreset = renderNoPreset.toJSON();

    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      }
    };
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
      expect(renderJSON.props.style.fontFamily).toBe(Typography.h1.fontFamily);
      expect(renderJSON.props.style.fontSize).toBe(Typography.h1.fontSize);
      expect(renderJSON.props.style.lineHeight).toBe(Typography.h1.lineHeight);
    });

    it("sets default styles if no preset is provided", () => {
      expect(renderJSONNoPreset.props.style.fontFamily).toBe(Typography.family.regular);
      expect(renderJSONNoPreset.props.style.fontSize).toBe(Typography.size.medium);
      expect(renderJSONNoPreset.props.style.color).toBe(Colors.basic.independence.drk);
    });
  });
});
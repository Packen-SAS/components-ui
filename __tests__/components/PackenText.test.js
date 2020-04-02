import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import Typography from "../../app/styles/abstracts/typography";

import PackenText from "../../app/components/PackenText";

describe("<PackenText/>", () => {
  let render, renderNoPreset, renderJSON, renderJSONNoPreset;

  beforeAll(() => {
    render = shallow(
      <PackenText preset="h1">Test</PackenText>
    );
    renderNoPreset = shallow(
      <PackenText>Test 2</PackenText>
    );
    renderJSON = render.props();
    renderJSONNoPreset = renderNoPreset.props();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
      expect(renderNoPreset).toBeDefined();
    });

    it("renders content correctly", () => {
      expect(renderJSON.children).toBe("Test");
      expect(renderJSONNoPreset.children).toBe("Test 2");
    });
  });

  describe("styling", () => {
    it("sets correct styles if preset is provided", () => {
      expect(renderJSON.style.fontFamily).toBe(Typography.h1.fontFamily);
      expect(renderJSON.style.fontSize).toBe(Typography.h1.fontSize);
      expect(renderJSON.style.lineHeight).toBe(Typography.h1.lineHeight);
    });

    it("sets default styles if no preset is provided", () => {
      expect(renderJSONNoPreset.style.fontFamily).toBe(Typography.family.regular);
      expect(renderJSONNoPreset.style.fontSize).toBe(Typography.size.medium);
      expect(renderJSONNoPreset.style.color).toBe(Colors.basic.independence.drk);
    });
  });
});
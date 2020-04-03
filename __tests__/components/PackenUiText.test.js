import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import Typography from "../../app/styles/abstracts/typography";

import PackenUiText from "../../app/components/PackenUiText";

describe("<PackenUiText/>", () => {
  let render, renderNoPreset, renderJSON, renderJSONNoPreset, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiText preset="h1">Test</PackenUiText>
    );
    renderNoPreset = shallow(
      <PackenUiText>Test 2</PackenUiText>
    );
    renderJSON = render.props();
    renderJSONNoPreset = renderNoPreset.props();
    renderInstance = render.instance();

    renderInstance.setState({
      preset: {},
      touchable: {}
    });
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

    it("returns the touchable styles with underline if set so via props", () => {
      render.setProps({
        touchable: {
          color: "#FFFFFF",
          underline: true
        }
      });
      const returnedStyles = renderInstance.getTouchableStyles();

      expect(returnedStyles).toEqual({
        color: "#FFFFFF",
        textDecorationLine: "underline"
      });
    });

    it("returns the touchable styles without underline if set so via props", () => {
      render.setProps({
        touchable: {
          color: "#FFFFFF",
          underline: false
        }
      });
      const returnedStyles = renderInstance.getTouchableStyles();

      expect(returnedStyles).toEqual({
        color: "#FFFFFF",
        textDecorationLine: "none"
      });
    });

    it("returns an empty object as the touchable styles if not set", () => {
      render.setProps({
        touchable: undefined
      });
      const returnedStyles = renderInstance.getTouchableStyles();

      expect(returnedStyles).toEqual({});
    });
  });
});
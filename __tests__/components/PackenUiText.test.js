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
      preset: "h1",
      touchable: {},
      children: "Test",
      icon: {},
      presetStyle: {},
      touchableStyles: {}
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

    it("returns simple content if it's not touchable or has an icon", () => {
      render.setProps({ icon: undefined, touchable: undefined });
      const returnedElement = renderInstance.getContent();
      
      expect(returnedElement).toBeDefined();
    });

    it("returns clickable content if it's touchable", () => {
      render.setProps({ icon: undefined, touchable: undefined });
      const returnedElement = renderInstance.getContent();
      
      expect(returnedElement).toBeDefined();
    });

    it("returns a left-aligned icon text if it's provided", () => {
      render.setProps({
        icon: {
          name: "check",
          position: "left",
          color: "#FFFFFF",
          size: 14
        },
        touchable: undefined
      });
      const returnedElement = renderInstance.getContent();
      
      expect(returnedElement).toBeDefined();
    });

    it("returns a right-aligned icon text if it's provided", () => {
      render.setProps({
        icon: {
          name: "check",
          position: "right",
          color: "#FFFFFF",
          size: 14
        },
        touchable: undefined
      });
      const returnedElement = renderInstance.getContent();
      
      expect(returnedElement).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("it updates the state with new, incoming props if there's a preset", () => {
      render.setProps({ preset: "h1" });
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });

    it("it updates the state with new, incoming props if there's no preset", () => {
      render.setProps({ preset: undefined });
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });
  });

  describe("triggering actions", () => {
    it("triggers a callback if provided", () => {
      render.setProps({ touchable: { callback: jest.fn() } });
      renderInstance.triggerCallback();

      expect(renderInstance.props.touchable.callback).toHaveBeenCalled();
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
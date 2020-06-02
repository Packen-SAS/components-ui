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

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        preset: undefined,
        touchable: undefined,
        children: undefined,
        icon: undefined,
        styling: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        preset: false,
        touchable: false,
        children: null,
        icon: false,
        presetStyle: {},
        touchableStyles: {
          label: {},
          wrapper: {}
        },
        styling: {}
      });
    });
  });

  describe("triggering actions", () => {
    it("triggers a callback if provided", () => {
      render.setProps({ touchable: { callback: jest.fn() } });
      renderInstance.triggerCallback();

      expect(renderInstance.props.touchable.callback).toHaveBeenCalled();
    });

    it("returns false while triggering a callback if not provided", () => {
      render.setProps({ touchable: undefined });
      const res = renderInstance.triggerCallback();

      expect(res).toBe(false);
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
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
          style: {
            label: {
              color: "#FFFFFF",
              textDecorationLine: "underline"
            }
          }
        }
      });
      const returnedStyles = renderInstance.getTouchableStyles();

      expect(returnedStyles).toEqual({
        label: {
          color: "#FFFFFF",
          textDecorationLine: "underline",
        },
        wrapper: {}
      });
    });

    it("returns the touchable styles without underline if set so via props", () => {
      render.setProps({
        touchable: {
          style: {
            label: {
              color: "#FFFFFF",
              textDecorationLine: "none"
            }
          }
        }
      });
      const returnedStyles = renderInstance.getTouchableStyles();

      expect(returnedStyles).toEqual({
        label: {
          color: "#FFFFFF",
          textDecorationLine: "none"
        },
        wrapper: {}
      });
    });

    it("returns an empty object as the touchable styles if not set", () => {
      render.setProps({
        touchable: undefined
      });
      const returnedStyles = renderInstance.getTouchableStyles();

      expect(returnedStyles).toEqual({
        label: {},
        wrapper: {}
      });
    });

    it("returns the correct touchable styles if wrapper styles are set, and no label styles are set", () => {
      render.setProps({
        touchable: {
          style: {
            label: undefined,
            wrapper: {
              backgroundColor: "#FFFFFF"
            }
          }
        }
      });
      const returnedStyles = renderInstance.getTouchableStyles();

      expect(returnedStyles).toEqual({
        label: {},
        wrapper: {
          backgroundColor: "#FFFFFF"
        }
      });
    });
  });
});
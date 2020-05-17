import "react-native";
import React from "react";
import { shallow } from "enzyme";

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

    renderInstance.setState({
      theme: "primary",
      icon: undefined,
      label: "A",
      dotPosition: "bottom",
      type: "info"
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns icon if set so", () => {
      renderInstance.setState({ icon: "check" });
      const returnedElement = renderInstance.getIcon();

      expect(returnedElement).toBeDefined();
    });

    it("returns null if icon is not set", () => {
      renderInstance.setState({ icon: undefined });
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
      renderInstance.setState({ label: undefined });
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
      renderInstance.setState({ dotPosition: undefined });
      const returnedElement = renderInstance.getDot();

      expect(returnedElement).toBe(null);
    });
  });

  describe("styling", () => {
    it("returns the default color if no 'theme' prop is provided", () => {
      renderInstance.setState({ theme: undefined });
      const returnedColor = renderInstance.getIconColor();
      
      expect(returnedColor).toBe(renderInstance.getStyles().icon.type.icon.color);
    });

    it("returns the correct color if a 'theme' prop is provided", () => {
      renderInstance.setState({ theme: "primary" });
      const returnedColor = renderInstance.getIconColor();
      
      expect(returnedColor).toBe(renderInstance.getStyles().icon.theme.primary.color);
    });
  });

  describe("state changing", () => {
    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        theme: undefined,
        icon: undefined,
        label: undefined,
        dotPosition: undefined,
        type: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        theme: "primary",
        icon: false,
        label: false,
        dotPosition: false,
        type: "info"
      });
    });

    it("returns incoming props as the state key-value pairs if provided", () => {
      render.setProps({
        theme: "primary",
        icon: "box",
        label: "A",
        dotPosition: "bottom",
        type: "info"
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        theme: "primary",
        icon: "box",
        label: "A",
        dotPosition: "bottom",
        type: "info"
      });
    });
  });

  describe("triggering actions", () => {
    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
    });
  });
});
import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiAvatar from "../../app/components/PackenUiAvatar";

describe("<PackenUiAvatar/>", () => {
  let render, renderInstance;
  const mockCallback = () => true;

  beforeAll(() => {
    render = shallow(
      <PackenUiAvatar
        size="tiny"
        src={require("../../assets/images/avatar.jpg")}
      />
    );
    renderInstance = render.instance();

    renderInstance.setState({
      src: require("../../assets/images/avatar.jpg"),
      size: "tiny",
      callback: mockCallback
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns the correct main inner content if its source is provided", () => {
      const returnedElement = renderInstance.getInner();

      expect(returnedElement).toBeDefined();
    });

    it("returns the correct main inner content if its source is not provided", () => {
      renderInstance.setState({ src: undefined });
      const returnedElement = renderInstance.getInner();

      expect(returnedElement).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidUpdate", () => {
      const prevProps = { test: "Test" };
      render.setProps({ test: "Test 2" });
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });
  });

  describe("state changing", () => {
    it("updates the state on incoming new props", () => {
      render.setProps({ callback: mockCallback, src: false, size: "small" });
      const prevState = { ...renderInstance.state };
      renderInstance.updateState();

      expect(prevState).toEqual({ src: false, size: "small", callback: mockCallback });
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        src: "",
        size: "",
        callback: mockCallback
      });
      const res = renderInstance.setPropsToState();
      
      expect(res).toEqual({
        src: false,
        size: "medium",
        callback: mockCallback
      });
    });
  });

  describe("styling", () => {
    it("returns the styles object", () => {
      const returnedStyles = renderInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });
  });
});
import "react-native";
import { View, Animated } from "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiLoaderButton from "../../app/components/PackenUiLoaderButton";

describe("<PackenUiLoaderButton/>", () => {
  let render, renderInstance;
  const mockCallback = () => true;

  beforeAll(() => {
    render = shallow(
      <PackenUiLoaderButton
        type="regular"
        level="secondary"
        size="large"
        isDone={false}
        callback={mockCallback}
      >Cargando...</PackenUiLoaderButton>
    );
    renderInstance = render.instance();

    renderInstance.setState({
      children: (<View></View>),
      type: "regular",
      level: "primary",
      size: "large",
      callback: mockCallback,
      isDone: false,
      anim: null,
      rotate: new Animated.Value(0)
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("updates the state with incoming new props", () => {
      const prevState = { ...renderInstance.state };
      renderInstance.updateState();

      expect(prevState).not.toEqual(renderInstance.state);
    });
  });

  describe("styling", () => {
    it("sets the animation", () => {
      const spyAnimatedLoop = jest.spyOn(Animated, "loop");
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.setAnim();

      expect(spyAnimatedLoop).toHaveBeenCalled();
      expect(spySetState).toHaveBeenCalled();
      spyAnimatedLoop.mockRestore();
      spySetState.mockRestore();
    });

    it("returns the styles object", () => {
      const returnedStyles = renderInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the correct code on componentDidMount", () => {
      const spySetAnim = jest.spyOn(renderInstance, "setAnim");
      renderInstance.componentDidMount();

      expect(spySetAnim).toHaveBeenCalled();
      spySetAnim.mockRestore();
    });

    it("executes the correct code on componentDidUpdate", () => {
      const prevProps = { test: "Test" };
      render.setProps({ test: "Test 2" });
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate();

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("returns the correct icon name if it's done", () => {
      renderInstance.setState({
        isDone: true
      });
      const returnedName = renderInstance.getIconName()

      expect(returnedName).toBe("check");
    });

    it("returns the correct icon name if it's not done", () => {
      renderInstance.setState({
        isDone: false
      });
      const returnedName = renderInstance.getIconName()

      expect(returnedName).toBe("loader");
    });
  });
});
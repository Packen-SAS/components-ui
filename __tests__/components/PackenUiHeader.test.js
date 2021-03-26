import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiHeader from "../../app/components/PackenUiHeader";

describe("<PackenUiHeader/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiHeader
        onBackPress={this.mockCallback}
      >Título de la vista</PackenUiHeader>
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();

      renderInstance.setState({ styling: { iconSize: 15, iconColor: "#FFFFFF" } });
      expect(render).toBeDefined();
    });

    it("returns the icon element", () => {
      renderInstance.setState({ noIcon: true });
      expect(renderInstance.getIcon()).toBeNull();

      renderInstance.setState({ noIcon: false });
      expect(renderInstance.getIcon()).toBeDefined();
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

    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
    });

    it("executes the onPressHandler if provided", () => {
      renderInstance.setState({ onBackPress: jest.fn() });
      renderInstance.onPressHandler();

      expect(renderInstance.state.onBackPress).toHaveBeenCalled();
    });

    it("returns false while executing the onPressHandler if not provided", () => {
      renderInstance.setState({ onBackPress: false });
      const res = renderInstance.onPressHandler();

      expect(res).toBe(false);
    });
  });

  describe("state changing", () => {
    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        icon: undefined,
        children: undefined,
        onBackPress: undefined,
        customStyle: undefined,
        styling: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        children: null,
        icon: "arrow-left",
        noIcon: false,
        onBackPress: false,
        customStyle: {},
        styling: {
          box: {},
          iconWrapper: {},
          iconSize: undefined,
          iconColor: undefined,
          title: {}
        },
        titlePreset: "h6"
      });
    });

    it("returns incoming props as the state key-value pairs if styling is provided", () => {
      render.setProps({ styling: { test: "Test" } });
      const res = renderInstance.setPropsToState();
      expect(res.styling).toEqual({ test: "Test" });
    });
  });
});
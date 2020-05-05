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
        children: undefined,
        onBackPress: undefined,
        customStyle: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        children: "",
        onBackPress: false,
        customStyle: {}
      });
    });
  });
});
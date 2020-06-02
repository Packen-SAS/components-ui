import "react-native";
import React from "react";
import { View } from "react-native";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import PackenUiTag from "../../app/components/PackenUiTag";

describe("<PackenUiTag/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiTag>Test</PackenUiTag>
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes componentDidUpdate handler", () => {
      const prevProps = { test: "Test" };
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
  });

  describe("state changing", () => {
    it("updates the state with new, incoming props", () => {
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });

    it("returns the incoming props as the state key-value pairs", () => {
      render.setProps({
        style: { color: "#FFFFFF" },
        boxStyles: { color: "#FFFFFF" },
        children: <View></View>,
        backgroundColor: "#FFFFFF",
        textColor: "#FFFFFF"
      });
      const res =renderInstance.setPropsToState();

      expect(res).toEqual({
        style: { color: "#FFFFFF" },
        boxStyles: { color: "#FFFFFF" },
        children: <View></View>,
        backgroundColor: "#FFFFFF",
        textColor: "#FFFFFF"
      });
    });

    it("returns the incoming props as the state key-value pairs if no props are provided", () => {
      render.setProps({
        style: undefined,
        boxStyles: undefined,
        children: undefined,
        backgroundColor: undefined,
        textColor: undefined
      });
      const res =renderInstance.setPropsToState();

      expect(res).toEqual({
        style: {},
        boxStyles: {},
        children: null,
        backgroundColor: Colors.brand.primary.snw,
        textColor: Colors.basic.independence.dft
      });
    });
  });
});
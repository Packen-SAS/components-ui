import "react-native";
import React from "react";
import { View } from "react-native";
import { shallow } from "enzyme";

import colors from "../../app/styles/abstracts/colors";
import PackenUiBadge from "../../app/components/PackenUiBadge";

describe("<PackenUiBadge/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiBadge
        label="10"
        width={25}
        height={25}
        backgroundColor={colors.warning.default}
        color={colors.warning.drk}
      />
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns the correct content", () => {
      let res = renderInstance.getContent();
      expect(res).toBeDefined();

      renderInstance.setState({ children: <View></View> });
      res = renderInstance.getContent();
      expect(res).toBeDefined();
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
  });

  describe("state changing", () => {
    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        label: undefined,
        width: undefined,
        height: undefined,
        color: undefined,
        backgroundColor: undefined,
        styling: undefined,
        fontSize: undefined,
        children: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        label: "",
        width: 16,
        height: 16,
        color: colors.basic.white.dft,
        backgroundColor: colors.brand.primary.drk,
        styling: { outer: {}, content: {}, dotWrapper: {}, wrapper: {}, label: {} },
        fontSize: 12,
        children: false
      });
    });

    it("returns incoming props as the state key-value pairs, if some are provided", () => {
      const mockNode = <View></View>;
      render.setProps({ borderRadius: 5, styling: { test: "Test" }, fontSize: 12, children: mockNode });
      const res = renderInstance.setPropsToState();
      
      expect(res.borderRadius).toBe(5);
      expect(res.styling).toEqual({ test: "Test" });
      expect(res.fontSize).toBe(12);
      expect(res.children).toBe(mockNode);
    });
  });
});
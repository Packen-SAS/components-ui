import "react-native";
import React from "react";
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
    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        label: undefined,
        width: undefined,
        height: undefined,
        color: undefined,
        backgroundColor: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        label: "",
        width: 16,
        height: 16,
        color: colors.basic.white.dft,
        backgroundColor: colors.brand.primary.drk
      });
    });
  });
});
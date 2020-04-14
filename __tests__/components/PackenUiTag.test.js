import "react-native";
import React from "react";
import { shallow } from "enzyme";

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
  });

  describe("state changing", () => {
    it("updates the state with new, incoming props", () => {
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });
  });
});
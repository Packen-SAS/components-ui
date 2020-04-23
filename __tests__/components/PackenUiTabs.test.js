import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiTabs from "../../app/components/PackenUiTabs";

describe("<PackenUiTabs/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    const mockCallback = jest.fn();
    render = shallow(
      <PackenUiTabs items={[
        {
          label: "Button",
          callback: mockCallback
        },
        {
          label: "Button",
          callback: mockCallback
        },
        {
          label: "Button",
          callback: mockCallback
        }
      ]} activeIndex={0} />
    );
    renderInstance = render.instance();
    
    renderInstance.setState({ activeTabIndex: 0 });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("updates the active tab index", () => {
      renderInstance.setState({
        onTabChange: jest.fn()
      });
      renderInstance.updateActiveIndex(1);
      
      expect(renderInstance.state.activeTabIndex).toBe(1);
      expect(renderInstance.state.onTabChange).toHaveBeenCalled();
    });

    it("updates the active tab index if no callback is provided", () => {
      renderInstance.setState({ onTabChange: false });
      renderInstance.updateActiveIndex(1);
      
      expect(renderInstance.state.activeTabIndex).toBe(1);
    });

    it("updates the state with new, incoming props", () => {
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        items: undefined,
        name: undefined,
        activeTabIndex: undefined,
        onTabChange: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        items: [],
        name: "",
        activeTabIndex: 0,
        onTabChange: false
      });
    });

    it("returns incoming props as the state key-value pairs if some are provided", () => {
      const mockCallback = jest.fn();
      render.setProps({
        name: "Test",
        activeIndex: 1,
        onTabChange: mockCallback
      });
      const res = renderInstance.setPropsToState();

      expect(res.name).toBe("Test");
      expect(res.activeTabIndex).toBe(1);
      expect(res.onTabChange).toBe(mockCallback);
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
});
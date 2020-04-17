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
      renderInstance.updateActiveIndex(1);
      
      expect(renderInstance.state.activeTabIndex).toBe(1);
    });

    it("updates the state with new, incoming props", () => {
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
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
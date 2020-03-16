import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenTabs from "../../app/components/PackenTabs";

describe("<PackenTabs/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    const mockCallback = jest.fn();
    render = renderer.create(
      <PackenTabs items={[
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

    renderInstance = render.getInstance();
    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      }
    };
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
  });
});
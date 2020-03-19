import "react-native";
import React from "react";
import { shallow } from "enzyme";

import TabsStyles from "../../app/styles/components/PackenTabs";
import PackenTabItem from "../../app/components/PackenTabItem";

describe("<PackenTabItem/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenTabItem
        key={0}
        activeTabIndex={0}
        selfIndex={0}
        label="Test"
        updateActiveTabIndex={mockCallback}
        callback={mockCallback} />
    );
    renderInstance = render.instance();

    renderInstance.setState({ itemStyles: {} });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidMount", () => {
      const spyCheckIfActive = jest.spyOn(renderInstance, "checkIfActive");
      renderInstance.componentDidMount();

      expect(spyCheckIfActive).toHaveBeenCalled();
      spyCheckIfActive.mockRestore();
    });
  });

  describe("styling", () => {
    it("returns item styles", () => {
      const returnedStyles = renderInstance.getItemStyles();

      expect(returnedStyles).toEqual({
        shape: {
          ...TabsStyles.item.base.shape,
          ...TabsStyles.item.default.shape
        },
        label: {
          ...TabsStyles.item.base.label,
          ...TabsStyles.item.default.label
        },
        icon: {
          ...TabsStyles.item.base.icon,
          ...TabsStyles.item.default.icon
        }
      });
    });
  });

  describe("state changing", () => {
    it("sets active tab", () => {
      const spySetActiveStyles = jest.spyOn(renderInstance, "setActiveStyles");
      render.setProps({
        updateActiveTabIndex: mockCallback,
        callback: mockCallback,
        selfIndex: 0
      });
      renderInstance.setActiveTab();

      expect(spySetActiveStyles).toHaveBeenCalled();
      spySetActiveStyles.mockRestore();

      expect(renderInstance.props.updateActiveTabIndex).toHaveBeenCalledWith(0);
      expect(renderInstance.props.callback).toHaveBeenCalled();
    });

    it("sets active styles", () => {
      const returnedStyles = renderInstance.setActiveStyles();

      expect(returnedStyles.shape).toEqual(TabsStyles.item.active.shape);
      expect(returnedStyles.label).toEqual(TabsStyles.item.active.label);
      expect(returnedStyles.icon).toEqual(TabsStyles.item.active.icon);
    });

    it("sets active styles if indexes match", () => {
      const spySetActiveStyles = jest.spyOn(renderInstance, "setActiveStyles");
      render.setProps({ activeTabIndex: 0, selfIndex: 0 });
      renderInstance.checkIfActive();

      expect(spySetActiveStyles).toHaveBeenCalled();
      spySetActiveStyles.mockRestore();
    });

    it("sets default styles if prop indexes don't match", () => {
      render.setProps({ activeTabIndex: 0, selfIndex: 1 });
      renderInstance.checkIfActive();

      expect(renderInstance.state.itemStyles).toEqual({
        shape: {
          ...TabsStyles.item.base.shape,
          ...TabsStyles.item.default.shape
        },
        label: {
          ...TabsStyles.item.base.label,
          ...TabsStyles.item.default.label
        },
        icon: {
          ...TabsStyles.item.base.icon,
          ...TabsStyles.item.default.icon
        }
      });
    });
  });
});
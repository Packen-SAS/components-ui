import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import TabsStyles from "../../app/styles/components/PackenTabs";
import PackenTabItem from "../../app/components/PackenTabItem";

describe("<PackenTabItem/>", () => {
  let render, renderInstance;
  const mockUpdateActiveTabIndex = jest.fn();
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = renderer.create(
      <PackenTabItem
        key={0}
        activeTabIndex={0}
        selfIndex={0}
        label="Test"
        updateActiveTabIndex={mockUpdateActiveTabIndex}
        callback={mockCallback} />
    );

    renderInstance = render.getInstance();
    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      }
    };
    renderInstance.setState({ itemStyles: {} });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidMount", () => {
      renderInstance.checkIfActive = jest.fn();
      renderInstance.componentDidMount();
      expect(renderInstance.checkIfActive).toHaveBeenCalled();
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
      renderInstance.setActiveStyles = jest.fn();
      renderInstance.props = { updateActiveTabIndex: jest.fn(), callback: jest.fn(), selfIndex: 0 };
      renderInstance.setActiveTab();
      expect(renderInstance.setActiveStyles).toHaveBeenCalled();
      expect(renderInstance.props.updateActiveTabIndex).toHaveBeenCalledWith(0);
      expect(renderInstance.props.callback).toHaveBeenCalled();
    });

    it("sets active styles", () => {
      renderInstance.setActiveStyles();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        const matchedStyles = {
          shape: {
            ...TabsStyles.item.base.shape,
            ...TabsStyles.item.default.shape,
            ...TabsStyles.item.active.shape
          },
          label: {
            ...TabsStyles.item.base.label,
            ...TabsStyles.item.default.label,
            ...TabsStyles.item.active.label
          },
          icon: {
            ...TabsStyles.item.base.icon,
            ...TabsStyles.item.default.icon,
            ...TabsStyles.item.active.icon
          }
        };
        expect(renderInstance.state.itemStyles).toBe(matchedStyles);
        clearTimeout(timeout);
      }, 4000);
    });

    it("sets active styles if indexes match", () => {
      renderInstance.props = { activeTabIndex: 0, selfIndex: 0 };
      renderInstance.setActiveStyles = jest.fn();
      renderInstance.checkIfActive();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.setActiveStyles).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 4000);
    });

    it("sets default styles if prop indexes don't match", () => {
      renderInstance.props = { activeTabIndex: 0, selfIndex: 1 };
      renderInstance.checkIfActive();
      
      const timeout = setTimeout(() => {
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
        clearTimeout(timeout);
      }, 4000);
    });
  });
});
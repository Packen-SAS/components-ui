import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiTabItem from "../../app/components/PackenUiTabItem";

describe("<PackenUiTabItem/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenUiTabItem
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

    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
    });

    it("executes pressInHandler", () => {
      renderInstance.pressInHandler();

      expect(renderInstance.state.itemStyles).toEqual({
        ...renderInstance.state.itemStyles,
        shape: {
          ...renderInstance.state.itemStyles.shape,
          ...renderInstance.getStyles().item.focus.shape
        },
        label: {
          ...renderInstance.state.itemStyles.label,
          ...renderInstance.getStyles().item.focus.label
        },
        icon: {
          ...renderInstance.state.itemStyles.icon,
          ...renderInstance.getStyles().item.focus.icon
        }
      });
    });

    it("executes correct code on componentDidUpdate", () => {
      const prevProps = { activeTabIndex: 1 };
      render.setProps({ activeTabIndex: 0 });
      const spyCheckIfActive = jest.spyOn(renderInstance, "checkIfActive");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyCheckIfActive).toHaveBeenCalled();
      spyCheckIfActive.mockRestore();
    });

    it("executes pressOutHandler", () => {
      const spySetActiveTab = jest.spyOn(renderInstance, "setActiveTab");
      renderInstance.pressOutHandler();

      expect(spySetActiveTab).toHaveBeenCalled();
      spySetActiveTab.mockRestore();
    });

    it("executes onPress event callback for the touchable", () => {
      const spySetActiveTab = jest.spyOn(renderInstance, "setActiveTab");
      render.props().onPress();

      expect(spySetActiveTab).toHaveBeenCalled();
      spySetActiveTab.mockRestore();
    });
  });

  describe("styling", () => {
    it("returns item styles", () => {
      const returnedStyles = renderInstance.getItemStyles();

      expect(returnedStyles).toEqual({
        shape: {
          ...renderInstance.getStyles().item.base.shape,
          ...renderInstance.getStyles().item.default.shape
        },
        label: {
          ...renderInstance.getStyles().item.base.label,
          ...renderInstance.getStyles().item.default.label
        },
        icon: {
          ...renderInstance.getStyles().item.base.icon,
          ...renderInstance.getStyles().item.default.icon
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

    it("sets active tab without calling callbacks if not provided", () => {
      const spySetActiveStyles = jest.spyOn(renderInstance, "setActiveStyles");
      render.setProps({
        updateActiveTabIndex: undefined,
        callback: undefined,
        selfIndex: 0
      });
      renderInstance.setState({
        updateActiveTabIndex: false,
        callback: false
      });
      renderInstance.setActiveTab();

      expect(spySetActiveStyles).toHaveBeenCalled();
      spySetActiveStyles.mockRestore();
    });

    it("sets active styles", () => {
      const returnedStyles = renderInstance.setActiveStyles();

      expect(returnedStyles.shape).toEqual(renderInstance.getStyles().item.active.shape);
      expect(returnedStyles.label).toEqual(renderInstance.getStyles().item.active.label);
      expect(returnedStyles.icon).toEqual(renderInstance.getStyles().item.active.icon);
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
          ...renderInstance.getStyles().item.base.shape,
          ...renderInstance.getStyles().item.default.shape
        },
        label: {
          ...renderInstance.getStyles().item.base.label,
          ...renderInstance.getStyles().item.default.label
        },
        icon: {
          ...renderInstance.getStyles().item.base.icon,
          ...renderInstance.getStyles().item.default.icon
        }
      });
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        updateActiveTabIndex: undefined,
        selfIndex: undefined,
        activeTabIndex: undefined,
        callback: undefined,
        icon: undefined,
        label: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        updateActiveTabIndex: false,
        selfIndex: 0,
        activeTabIndex: 0,
        callback: false,
        icon: false,
        label: ""
      });
    });

    it("returns incoming props as the state key-value pairs if activeTabIndex is provided", () => {
      render.setProps({ activeTabIndex: 1 });
      const res = renderInstance.setPropsToState();

      expect(res.activeTabIndex).toBe(1);
    });
  });

  describe("rendering", () => {
    it("renders an icon if provided, and is not a '»'", () => {
      render.setProps({
        icon: "check"
      });
      renderInstance.state = {
        itemStyles: {
          icon: {
            color: "#000000",
            fontSize: 12
          }
        }
      };
      const returnedElement = renderInstance.getIcon();

      expect(returnedElement).toBeDefined();
    });

    it("renders an icon if provided, and is a '»'", () => {
      render.setProps({
        icon: "»"
      });
      renderInstance.setState({
        itemStyles: {
          icon: {}
        }
      });
      const returnedElement = renderInstance.getIcon();

      expect(returnedElement).toBeDefined();
    });
  });
});
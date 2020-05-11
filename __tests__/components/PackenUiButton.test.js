import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import PackenUiButton from "../../app/components/PackenUiButton";

describe("<PackenUiButton/>", () => {
  let renderRegular, renderIcon, renderRegularInstance, renderIconInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    renderRegular = shallow(
      <PackenUiButton
        icon={{ name: "arrow-right", position: "right" }}
        type="regular"
        level="primary"
        size="medium"
        callback={mockCallback}>Medium</PackenUiButton>
    );
    renderIcon = shallow(
      <PackenUiButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="secondary"
        size="large"
        callback={mockCallback} />
    );

    renderRegularInstance = renderRegular.instance();
    renderIconInstance = renderIcon.instance();

    renderRegularInstance.setState({
      type: "regular",
      level: "primary",
      size: "small",
      icon: undefined,
      isDisabled: false,
      styles: {
        shape: {},
        content: {},
        icon: {}
      }
    });
    renderIconInstance.setState({
      type: "icon",
      level: "primary",
      size: "small",
      icon: { name: "arrow-right-circle", fontSize: 12, color: "#FFFFFF" },
      isDisabled: false,
      styles: {
        shape: {},
        content: {},
        icon: {}
      }
    });
  });

  describe("triggering actions", () => {
    it("executes callback", () => {
      renderRegularInstance.setState({ callback: mockCallback });
      renderRegularInstance.executeCallback();

      expect(mockCallback).toHaveBeenCalled();
    });

    it("returns false while trying to execute the callback if not provided", () => {
      renderRegularInstance.setState({ callback: false });
      const res = renderRegularInstance.executeCallback();

      expect(res).toBe(false);
    });

    it("changes styles while onPressIn", () => {
      const prevStyles = renderRegularInstance.state.styles;
      renderRegularInstance.pressInHandler();

      expect(renderRegularInstance.state.styles).not.toBe(prevStyles);
    });

    it("changes styles while onPressIn and 'level' is 'secondary'", () => {
      const prevStyles = renderRegularInstance.state.styles;
      renderRegularInstance.setState({ level: "secondary" });
      renderRegularInstance.pressInHandler();

      expect(renderRegularInstance.state.styles).not.toBe(prevStyles);
      expect(renderRegularInstance.state.styles.shape.borderColor).toBe(Colors.secondary.focus);
    });

    it("changes styles while onPressOut", () => {
      const prevStyles = renderRegularInstance.state.styles;
      renderRegularInstance.pressOutHandler();

      expect(renderRegularInstance.state.styles).not.toBe(prevStyles);
    });

    it("executes correct code on componentDidUpdate", () => {
      const prevProps = { test: "Test 1" };
      renderRegular.setProps({ test: "Test 2" });
      const spyUpdateState = jest.spyOn(renderRegularInstance, "updateState");
      renderRegularInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      renderRegular.setProps({ instance: jest.fn() });
      renderRegularInstance.componentDidMount();

      expect(renderRegularInstance.props.instance).toHaveBeenCalled();
    });

    it("starts the icon animation while checking its state", () => {
      renderRegularInstance.setState({
        icon: {
          name: "check",
          position: "left",
          styles: { done: {}, loading: {} },
          anim: {
            state: "loading",
            controller: { start: jest.fn() }
          }
        }
      });
      renderRegularInstance.checkIconAnimState();

      expect(renderRegularInstance.state.icon.anim.controller.start).toHaveBeenCalled();
    });

    it("stops the icon animation while checking its state", () => {
      renderRegularInstance.setState({
        icon: {
          name: "check",
          position: "left",
          styles: { done: {}, loading: {} },
          anim: {
            state: "done",
            controller: { stop: jest.fn() }
          }
        }
      });
      renderRegularInstance.checkIconAnimState();

      expect(renderRegularInstance.state.icon.anim.controller.stop).toHaveBeenCalled();
    });
  });

  describe("styling", () => {
    it("returns current styles", () => {
      const returnedStyles = renderRegularInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });

    it("sets correct styles if it's disabled and not a ghost", () => {
      renderRegular.setProps({
        isDisabled: true
      });
      const returnedStyles = renderRegularInstance.getStyles();

      expect(returnedStyles.shape.backgroundColor).toBe(Colors.base.disabled);
      expect(returnedStyles.icon.color).toBe(Colors.base.white);
    });

    it("sets correct styles if it's disabled, a ghost, and has no label", () => {
      renderRegularInstance.setState({
        isDisabled: true,
        level: "ghost",
        type: "icon",
        icon: {
          name: "check",
          fontSize: 12,
          color: "#FFFFFF"
        }
      });
      const returnedStyles = renderRegularInstance.getStyles();

      expect(returnedStyles.shape.backgroundColor).toBe(Colors.base.transparent);
      expect(returnedStyles.icon.color).toBe(Colors.base.disabled_alt);
    });

    it("sets correct styles if it's disabled, a ghost, and has a label", () => {
      renderRegular.setProps({
        isDisabled: true,
        level: "ghost",
        type: "regular"
      });
      const returnedStyles = renderRegularInstance.getStyles();

      expect(returnedStyles.shape.backgroundColor).toBe(Colors.base.transparent);
      expect(returnedStyles.icon.color).toBe(Colors.base.disabled_alt);
      expect(returnedStyles.label.color).toBe(Colors.base.disabled_alt);
    });

    it("sets correct styles if it's disabled and a secondary", () => {
      renderRegular.setProps({
        isDisabled: true,
        level: "secondary",
        type: "regular"
      });
      const returnedStyles = renderRegularInstance.getStyles();

      expect(returnedStyles.shape.borderWidth).toBe(0);
    });

    it("disables pointer events if set so via props", () => {
      renderRegularInstance.setState({
        isDisabled: true
      });

      expect(renderRegular.props().pointerEvents).toBe("none");
    });

    it("enables pointer events if it's not disabled", () => {
      renderRegularInstance.setState({
        isDisabled: false
      });

      expect(renderRegular.props().pointerEvents).toBe("auto");
    });
  });

  describe("rendering", () => {
    it("renders a regular button correctly", () => {
      expect(renderRegular).toBeDefined();
    });

    it("renders a regular button with an icon to the left correctly", () => {
      renderRegularInstance.setState({
        icon: {
          name: "check",
          position: "left",
          fontSize: 12,
          color: "#FFFFFF"
        }
      });
      expect(renderRegular).toBeDefined();
    });

    it("renders an icon button correctly", () => {
      expect(renderIcon).toBeDefined();
    });

    it("returns the icon element if provided", () => {
      renderRegularInstance.setState({
        icon: {
          name: "check",
          fontSize: 12,
          color: "#FFFFFF"
        }
      });
      const returnedElement = renderRegularInstance.getIcon();

      expect(returnedElement).toBeDefined();
    });

    it("returns the main content if type is 'icon'", () => {
      renderRegularInstance.setState({
        type: "icon"
      });
      const returnedElement = renderRegularInstance.getContent();

      expect(returnedElement).toBeDefined();
    });

    it("returns the main content if type is 'regular'", () => {
      renderRegularInstance.setState({
        type: "regular"
      });
      const returnedElement = renderRegularInstance.getContent();

      expect(returnedElement).toBeDefined();
    });

    it("returns null as the main content if type is not defined", () => {
      renderRegularInstance.setState({
        type: undefined
      });
      const returnedElement = renderRegularInstance.getContent();

      expect(returnedElement).toBe(null);
    });
  });

  describe("state changing", () => {
    it("returns incoming props as the state key-value pairs", () => {
      renderRegular.setProps({
        type: undefined,
        level: undefined,
        size: undefined,
        icon: undefined,
        callback: undefined,
        isDisabled: undefined,
        nonTouchable: undefined,
        children: undefined
      });
      const res = renderRegularInstance.setPropsToState();

      expect(res).toEqual({
        type: "regular",
        level: "primary",
        size: "medium",
        icon: undefined,
        callback: false,
        isDisabled: false,
        nonTouchable: false,
        children: undefined
      });
    });

    it("returns incoming props as the state key-value pairs if nonTouchable is provided", () => {
      renderRegular.setProps({ nonTouchable: true });
      const res = renderRegularInstance.setPropsToState();

      expect(res.nonTouchable).toBe(true);
    });
  });
});
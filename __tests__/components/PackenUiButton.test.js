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

      renderRegularInstance.setState({ type: "icon", level: "primary", icon: {}, isOutline: true });
      const res = renderRegularInstance.pressInHandler();
      expect(res.icon.color).toBe(Colors.basic.white.dft);
      expect(res.shape.borderColor).toBe(Colors.primary.focus);
    });

    it("changes styles while onPressIn and 'level' is 'secondary'", () => {
      const prevStyles = renderRegularInstance.state.styles;
      renderRegularInstance.setState({ level: "secondary" });
      renderRegularInstance.pressInHandler();

      expect(renderRegularInstance.state.styles).not.toBe(prevStyles);
      expect(renderRegularInstance.state.styles.shape.borderColor).toBe(Colors.basic.gray.dft);
    });

    it("changes styles while onPressOut", () => {
      const prevStyles = renderRegularInstance.state.styles;
      renderRegularInstance.pressOutHandler();
      expect(renderRegularInstance.state.styles).not.toBe(prevStyles);

      renderRegularInstance.setState({ type: "icon", level: "primary", icon: {}, isOutline: true });
      let res = renderRegularInstance.pressOutHandler();
      expect(res.shape).toEqual({ ...renderRegularInstance.getStyles().shape, ...renderRegularInstance.createStyles().shape.outline.primary });

      renderRegularInstance.setState({ type: "regular", level: "primary", icon: undefined, isOutline: false });
      res = renderRegularInstance.pressOutHandler();
      expect(res.label.color).toBe(Colors.basic.white.dft);
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

      expect(returnedStyles.shape.backgroundColor).toBe(Colors.ghost.focus);
      expect(returnedStyles.icon.color).toBe(Colors.basic.white.dft);
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

      expect(returnedStyles.shape.backgroundColor).toBe(Colors.ghost.default);
      expect(returnedStyles.icon.color).toBe(Colors.base.disabled_alt);
    });

    it("sets correct styles if it's disabled, a ghost, and has a label", () => {
      renderRegular.setProps({
        isDisabled: true,
        level: "ghost",
        type: "regular"
      });
      const returnedStyles = renderRegularInstance.getStyles();

      expect(returnedStyles.shape.backgroundColor).toBe(Colors.ghost.default);
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

    it("returns the correct outline styles", () => {
      const styles = { test: "Test" };
      const res = renderRegularInstance.getOutlineStyles(styles, true, "primary");
      expect(res).toEqual({
        test: "Test",
        shape: { ...styles.shape, ...renderRegularInstance.createStyles().shape.outline.primary },
        label: { ...styles.label, ...renderRegularInstance.createStyles().label.outline.primary },
        icon: { ...styles.icon, ...renderRegularInstance.createStyles().icon.outline.primary }
      });
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
      let returnedElement = renderRegularInstance.getIcon();
      expect(returnedElement).toBeDefined();

      renderRegularInstance.setState({ styling: { iconSize: 15, iconColor: "#FFFFFF" } });
      returnedElement = renderRegularInstance.getIcon();
      expect(returnedElement).toBeDefined();

      renderRegularInstance.setState({
        icon: {
          name: "check",
          anim: {},
          styles: {},
          state: "done"
        },
        styling: { iconSize: 15, iconColor: "#FFFFFF" }
      });
      returnedElement = renderRegularInstance.getIcon();
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
        isOutline: undefined,
        isDisabled: undefined,
        nonTouchable: undefined,
        children: undefined,
        styling: undefined
      });
      const res = renderRegularInstance.setPropsToState();

      expect(res).toEqual({
        type: "regular",
        level: "primary",
        size: "medium",
        icon: undefined,
        callback: false,
        isOutline: false,
        isDisabled: false,
        nonTouchable: false,
        children: undefined,
        styling: {
          shape: {},
          shapeContent: {},
          label: {},
          iconWrapper: {},
          iconSize: undefined,
          iconColor: undefined
        }
      });
    });

    it("returns incoming props as the state key-value pairs, if some are provided", () => {
      renderRegular.setProps({ isOutline: true, nonTouchable: true, styling: { test: "Test" } });
      const res = renderRegularInstance.setPropsToState();

      expect(res.isOutline).toBe(true);
      expect(res.nonTouchable).toBe(true);
      expect(res.styling).toEqual({ test: "Test" });
    });
  });
});
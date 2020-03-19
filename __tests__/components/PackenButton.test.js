import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import PackenButton from "../../app/components/PackenButton";

describe("<PackenButton/>", () => {
  let renderRegular, renderIcon, renderRegularInstance, renderIconInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    renderRegular = shallow(
      <PackenButton
        icon={{ name: "arrow-right", position: "right" }}
        type="regular"
        level="primary"
        size="medium"
        callback={mockCallback}>Medium</PackenButton>
    );
    renderIcon = shallow(
      <PackenButton
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
      shapeHeight: 0,
      shapeWidth: 0,
      iconHeight: 0,
      iconWidth: 0,
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
      icon: { name: "arrow-right-circle" },
      isDisabled: false,
      shapeHeight: 0,
      shapeWidth: 0,
      iconHeight: 0,
      iconWidth: 0,
      styles: {
        shape: {},
        content: {},
        icon: {}
      }
    });
  });

  describe("rendering", () => {
    it("renders a regular button correctly", () => {
      expect(renderRegular).toBeDefined();
    });

    it("renders an icon button correctly", () => {
      expect(renderIcon).toBeDefined();
    });
  });

  describe("styling", () => {
    /* it("returns correct current styles if it's disabled and has a label", () => {
      renderRegularInstance.props = { isDisabled: true };
      const returnedStyles = renderRegularInstance.getStyles();

      expect(returnedStyles.label.color).toEqual(Colors.base.white);
    });

    it("returns correct current styles if it's disabled and has a shape with borders", () => {
      renderRegularInstance.props = { isDisabled: true };
      const returnedStyles = renderRegularInstance.getStyles();

      expect(returnedStyles.shape.borderWidth).toBe(0);
    }); */

    it("returns current styles", () => {
      const returnedStyles = renderRegularInstance.getStyles();
      
      expect(returnedStyles).toBeDefined();
    });
  });

  describe("getting dimensions", () => {
    it("returns shape dimensions", () => {
      renderRegularInstance.getShapeDimensions({height: 100, width: 100});
      
      expect(renderRegularInstance.state.shapeHeight).toBe(100);
      expect(renderRegularInstance.state.shapeWidth).toBe(100);
    });

    it("returns icon dimensions", () => {
      renderRegularInstance.setState({ icon: { name: "arrow-right", position: "right" } });
      renderRegularInstance.getIconDimensions({height: 10, width: 10});
      
      expect(renderRegularInstance.state.iconHeight).toBe(10);
      expect(renderRegularInstance.state.iconWidth).toBe(10);
    });
  });

  describe("triggering actions", () => {
    it("executes callback", () => {
      renderRegularInstance.executeCallback();

      expect(mockCallback).toHaveBeenCalled();
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

    it("updates styles after onLayout changes", () => {
      const prevStyles = renderRegularInstance.styles;
      const prevState = {
        shapeHeight: 0,
        iconHeight: 0,
        iconWidth: 0
      };
      renderRegularInstance.setState({
        shapeHeight: 1,
        iconHeight: 1,
        iconWidth: 1
      });

      renderRegularInstance.componentDidUpdate(null, prevState, null);
      
      expect(renderRegularInstance.state.styles).not.toEqual(prevStyles);
    });

    /* it("executes press events callbacks", () => {
      renderRegularInstance.executeCallback = jest.fn();
      renderRegularInstance.pressInHandler = jest.fn();
      renderRegularInstance.pressOutHandler = jest.fn();
      
      renderRegular.props().children.props.onPressIn();
      expect(renderRegularInstance.pressInHandler).toHaveBeenCalled();

      renderRegular.props().children.props.onPressOut();
      expect(renderRegularInstance.pressOutHandler).toHaveBeenCalled();

      renderRegular.props().children.props.onPress();
      expect(renderRegularInstance.executeCallback).toHaveBeenCalled();
    }); */

    it("executes onLayout event callback for shape", () => {
      renderRegularInstance.getShapeDimensions = jest.fn();
      renderRegular.props().children.props.children.props.children.props.onLayout({
        nativeEvent: {
          layout: {
            width: 10,
            height: 10
          }
        }
      });

      expect(renderRegularInstance.getShapeDimensions).toHaveBeenCalledWith({
        width: 10,
        height: 10
      });
    });

    it("executes onLayout event callback for icon", () => {
      renderRegularInstance.getIconDimensions = jest.fn();
      renderRegular.props().children.props.children.props.children.props.children[1].props.onLayout({
        nativeEvent: {
          layout: {
            width: 10,
            height: 10
          }
        }
      });

      expect(renderRegularInstance.getIconDimensions).toHaveBeenCalledWith({
        width: 10,
        height: 10
      });
    });
  });
});
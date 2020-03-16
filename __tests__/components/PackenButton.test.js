import "react-native";
import React from "react";

import PackenButton from "../../app/components/PackenButton";

import renderer from "react-test-renderer";

describe("<PackenButton/>", () => {
  let renderRegular, renderIcon, renderRegularInstance, renderIconInstance;
  const mock_callback = jest.fn();

  beforeAll(() => {
    renderRegular = renderer.create(
      <PackenButton
        icon={{ name: "arrow-right", position: "right" }}
        type="regular"
        level="primary"
        size="medium"
        callback={mock_callback}>Medium</PackenButton>
    );
    renderIcon = renderer.create(
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="secondary"
        size="large"
        callback={mock_callback} />
    );

    renderRegularInstance = renderRegular.getInstance();
    renderIconInstance = renderIcon.getInstance();

    renderRegularInstance.setState = state => {
      renderRegularInstance.state = {
        ...renderRegularInstance.state,
        ...state
      };
    }
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
      styles: {}
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
      expect(mock_callback).toHaveBeenCalled();
    });

    it("changes styles while onPressIn", () => {
      const prevStyles = renderRegularInstance.state.styles;
      renderRegularInstance.pressInHandler();
      expect(renderRegularInstance.state.styles).not.toBe(prevStyles);
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
  });
});
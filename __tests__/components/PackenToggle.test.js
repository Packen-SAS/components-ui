import "react-native";
import React from "react";
import { shallow } from "enzyme";

import ToggleStyles from "../../app/styles/components/PackenToggle";

import PackenToggle from "../../app/components/PackenToggle";

describe("<PackenToggle/>", () => {
  let render, renderInstance;
  const mockFunction = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenToggle
        onLabel="SÍ"
        offLabel="NO"
        isActive={true}
        toggleHandler={this.toggle_handler}
      />
    );
    renderInstance = render.instance();

    renderInstance.setState({
      initialState: "active",
      state: "active",
      isDisabled: false,
      shape: {
        height: 0,
        width: 0,
        disabled: {}
      },
      dot: {
        height: 0,
        width: 0,
        positioning: {},
        disabled: {}
      },
      on: {
        height: 0,
        width: 0,
        positioning: {},
        disabled: {}
      },
      off: {
        height: 0,
        width: 0,
        positioning: {},
        disabled: {}
      }
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidMount", () => {
      const spyPositionElement = jest.spyOn(renderInstance, "positionElement");
      const spyCheckIfDisabled = jest.spyOn(renderInstance, "checkIfDisabled");
      renderInstance.componentDidMount();

      expect(spyPositionElement).toHaveBeenCalled();
      expect(spyCheckIfDisabled).toHaveBeenCalled();
      spyPositionElement.mockRestore();
      spyCheckIfDisabled.mockRestore();
    });

    it("toggles inner state", () => {
      render.setProps({ toggleHandler: mockFunction });
      renderInstance.setState({ state: "active" });
      renderInstance.toggle();

      expect(renderInstance.state.state).toBe("inactive");
      expect(renderInstance.props.toggleHandler).toHaveBeenCalledWith("inactive");
    });

    it("executes correct code on componentDidUpdate", () => {
      renderInstance.setState({ state: "active" });
      const prevState = { state: "inactive" };
      const spyPositionElement = jest.spyOn(renderInstance, "positionElement");
      const spyCheckIfDisabled = jest.spyOn(renderInstance, "checkIfDisabled");
      renderInstance.componentDidUpdate(null, prevState, null);

      expect(spyPositionElement).toHaveBeenCalled();
      expect(spyCheckIfDisabled).toHaveBeenCalled();
      spyPositionElement.mockRestore();
      spyCheckIfDisabled.mockRestore();
    });
  });

  describe("state changing", () => {
    it("sets disabled styles", () => {
      renderInstance.setDisabledStyles();

      expect(renderInstance.state.shape).toEqual({
        ...renderInstance.state.shape,
        disabled: {
          ...ToggleStyles.shape.disabled
        }
      });
      expect(renderInstance.state.dot).toEqual({
        ...renderInstance.state.dot,
        disabled: {
          ...ToggleStyles.dot.disabled
        }
      });
      expect(renderInstance.state.on).toEqual({
        ...renderInstance.state.on,
        disabled: {
          ...ToggleStyles.label.on.disabled
        }
      });
      expect(renderInstance.state.off).toEqual({
        ...renderInstance.state.off,
        disabled: {
          ...ToggleStyles.label.off.disabled
        }
      });
    });

    it("checks if the component is not disabled", () => {
      const response = renderInstance.checkIfDisabled();

      expect(response).toBe(false || undefined);
    });

    it("sets state as 'disabled' if prop is present", () => {
      render.setProps({ isDisabled: true });
      const spySetDisabledStyles = jest.spyOn(renderInstance, "setDisabledStyles");
      renderInstance.checkIfDisabled();

      expect(renderInstance.state.state).toBe("disabled");
      expect(spySetDisabledStyles).toHaveBeenCalled();
    });

    it("sets shape dimensions", () => {
      renderInstance.getShapeDimensions({
        nativeEvent: {
          layout: {
            height: 10,
            width: 10
          }
        }
      });
      
      expect(renderInstance.state.shape).toEqual({
        ...renderInstance.state.shape,
        height: 10,
        width: 10
      });
    });

    it("sets dot dimensions", () => {
      renderInstance.getDotDimensions({
        nativeEvent: {
          layout: {
            height: 10,
            width: 10
          }
        }
      });

      expect(renderInstance.state.dot).toEqual({
        ...renderInstance.state.dot,
        height: 10,
        width: 10
      });
    });

    it("sets on dimensions", () => {
      renderInstance.getOnDimensions({
        nativeEvent: {
          layout: {
            height: 10,
            width: 10
          }
        }
      });

      expect(renderInstance.state.on).toEqual({
        ...renderInstance.state.on,
        height: 10,
        width: 10
      });
    });

    it("sets off dimensions", () => {
      renderInstance.getOffDimensions({
        nativeEvent: {
          layout: {
            height: 10,
            width: 10
          }
        }
      });

      expect(renderInstance.state.off).toEqual({
        ...renderInstance.state.off,
        height: 10,
        width: 10
      });
    });

    it("sets state with position styles is state is 'active'", () => {
      renderInstance.setState({ state: "active", shape: { height: 10 }, on: { height: 10 } });
      renderInstance.state.state = "active";
      renderInstance.positionElement();

      expect(renderInstance.state.dot).toEqual({
        ...renderInstance.state.dot,
        positioning: {
          top: 2,
          right: 2
        }
      });
      expect(renderInstance.state.on).toEqual({
        ...renderInstance.state.on,
        positioning: {
          position: "absolute",
          top: 10,
          left: 8,
          bottom: "auto",
          right: "auto"
        }
      });
      expect(renderInstance.state.off).toEqual({
        ...renderInstance.state.off,
        positioning: {
          opacity: 0
        }
      });
    });
  });

  describe("styling", () => {
    it("returns correct position styles if 'state' is 'active'", () => {
      renderInstance.setState({ state: "active", shape: { height: 10 }, on: { height: 10 } });
      const returnedStyles = renderInstance.getPositionStyles();

      expect(returnedStyles).toEqual({
        dot: {
          top: 2,
          right: 2
        },
        on: {
          position: "absolute",
          top: 10,
          left: 8,
          bottom: "auto",
          right: "auto"
        },
        off: {
          opacity: 0
        }
      });
    });

    it("returns correct position styles if 'state' is 'inactive'", () => {
      renderInstance.setState({ state: "inactive", shape: { height: 10 }, off: { height: 10 } });
      renderInstance.state.state = "inactive";
      const returnedStyles = renderInstance.getPositionStyles();

      expect(returnedStyles).toEqual({
        dot: {
          top: 2,
          left: 2
        },
        off: {
          position: "absolute",
          top: 10,
          right: 8,
          bottom: "auto",
          left: "auto"
        },
        on: {
          opacity: 0
        }
      });
    });
  });
});
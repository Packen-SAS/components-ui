import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import ToggleStyles from "../../app/styles/components/PackenToggle";
import PackenToggle from "../../app/components/PackenToggle";

describe("<PackenToggle/>", () => {
  let render, renderInstance;
  const mockFunction = jest.fn();

  beforeAll(() => {
    render = renderer.create(
      <PackenToggle
        onLabel="SÍ"
        offLabel="NO"
        isActive={true}
        toggleHandler={this.toggle_handler}
      />
    );

    renderInstance = render.getInstance();

    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      };
    };
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
        position: {},
        disabled: {}
      },
      on: {
        height: 0,
        width: 0,
        position: {},
        disabled: {}
      },
      off: {
        height: 0,
        width: 0,
        position: {},
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
      renderInstance.positionElements = mockFunction;
      renderInstance.checkIfDisabled = mockFunction;
      renderInstance.componentDidMount();
      expect(renderInstance.positionElements).toHaveBeenCalled();
      expect(renderInstance.checkIfDisabled).toHaveBeenCalled();
    });

    it("toggles inner state", () => {
      renderInstance.props = { toggleHandler: jest.fn() };
      renderInstance.setState({ state: "active" });
      renderInstance.toggle();

      /* Review to avoid using setTimeOut */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.state).toBe("inactive");
        expect(renderInstance.props.toggleHandler).toHaveBeenCalledWith("inactive");
        clearTimeout(timeout);
      }, 4000);
    });

    it("executes correct code on componentDidUpdate", () => {
      renderInstance.setState({ state: "active" });
      const prevState = { state: "inactive" };
      renderInstance.positionElements = mockFunction;
      renderInstance.checkIfDisabled = mockFunction;
      renderInstance.componentDidUpdate(null, prevState, null);
      expect(renderInstance.positionElements).toHaveBeenCalled();
      expect(renderInstance.checkIfDisabled).toHaveBeenCalled();
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
      renderInstance.props = { isDisabled: true };
      renderInstance.setDisabledStyles = mockFunction;
      renderInstance.checkIfDisabled();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.state).toBe("disabled");
        expect(renderInstance.setDisabledStyles).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 4000);
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

      renderInstance.positionElements = mockFunction;
      
      expect(renderInstance.state.shape).toEqual({
        ...renderInstance.state.shape,
        height: 10,
        width: 10
      });
      expect(renderInstance.positionElements).toHaveBeenCalled();
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

      renderInstance.positionElements = mockFunction;
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.dot).toEqual({
          ...renderInstance.state.dot,
          height: 10,
          width: 10
        });
        expect(renderInstance.positionElements).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 2000);
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

      renderInstance.positionElements = mockFunction;
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.on).toBe({
          ...renderInstance.state.on,
          height: 10,
          width: 10
        });
        expect(renderInstance.positionElements).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 4000);
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

      renderInstance.positionElements = mockFunction;
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.off).toEqual({
          ...renderInstance.state.off,
          height: 10,
          width: 10
        });
        expect(renderInstance.positionElements).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 2000);
    });

    it("sets state with position styles", () => {
      renderInstance.setState({ state: "active", shape: { height: 10 }, on: { height: 10 } });
      renderInstance.positionElements();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.dot).toEqual({
          ...renderInstance.state.dot,
          positioning: { top: 2, right: 2 }
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
        expect(renderInstance.state.off).toEqual({ opacity: 0 });
        clearTimeout(timeout);
      }, 2000);
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
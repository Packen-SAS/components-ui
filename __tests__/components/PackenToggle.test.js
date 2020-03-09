import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import ToggleStyles from "../../app/styles/components/PackenToggle";
import PackenToggle from "../../app/components/PackenToggle";

describe("<PackenToggle/>", () => {
  let render, renderInstance;
  const mock_function = jest.fn();

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
      renderInstance.position_elements = mock_function;
      renderInstance.check_if_disabled = mock_function;
      renderInstance.componentDidMount();
      expect(renderInstance.position_elements).toHaveBeenCalled();
      expect(renderInstance.check_if_disabled).toHaveBeenCalled();
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
      }, 2000);
    });

    it("executes correct code on componentDidUpdate", () => {
      renderInstance.setState({ state: "active" });
      const prevState = { state: "inactive" };
      renderInstance.position_elements = mock_function;
      renderInstance.check_if_disabled = mock_function;
      renderInstance.componentDidUpdate(null, prevState, null);
      expect(renderInstance.position_elements).toHaveBeenCalled();
      expect(renderInstance.check_if_disabled).toHaveBeenCalled();
    });
  });

  describe("state changing", () => {
    it("sets disabled styles", () => {
      renderInstance.set_disabled_styles();
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
      const response = renderInstance.check_if_disabled();
      expect(response).toBe(false || undefined);
    });

    it("sets state as 'disabled' if prop is present", () => {
      renderInstance.props = { isDisabled: true };
      renderInstance.set_disabled_styles = mock_function;
      renderInstance.check_if_disabled();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.state).toBe("disabled");
        expect(renderInstance.set_disabled_styles).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 1000);
    });

    it("sets shape dimensions", () => {
      renderInstance.get_shape_dimensions({
        nativeEvent: {
          layout: {
            height: 10,
            width: 10
          }
        }
      });

      renderInstance.position_elements = mock_function;
      
      expect(renderInstance.state.shape).toEqual({
        ...renderInstance.state.shape,
        height: 10,
        width: 10
      });
      expect(renderInstance.position_elements).toHaveBeenCalled();
    });

    it("sets dot dimensions", () => {
      renderInstance.get_dot_dimensions({
        nativeEvent: {
          layout: {
            height: 10,
            width: 10
          }
        }
      });

      renderInstance.position_elements = mock_function;
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.dot).toEqual({
          ...renderInstance.state.dot,
          height: 10,
          width: 10
        });
        expect(renderInstance.position_elements).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 1000);
    });

    it("sets on dimensions", () => {
      renderInstance.get_on_dimensions({
        nativeEvent: {
          layout: {
            height: 10,
            width: 10
          }
        }
      });

      renderInstance.position_elements = mock_function;
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.on).toEqual({
          ...renderInstance.state.on,
          height: 10,
          width: 10
        });
        expect(renderInstance.position_elements).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 1000);
    });

    it("sets off dimensions", () => {
      renderInstance.get_off_dimensions({
        nativeEvent: {
          layout: {
            height: 10,
            width: 10
          }
        }
      });

      renderInstance.position_elements = mock_function;
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.off).toEqual({
          ...renderInstance.state.off,
          height: 10,
          width: 10
        });
        expect(renderInstance.position_elements).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 1000);
    });

    it("sets state with position styles", () => {
      renderInstance.setState({ state: "active", shape: { height: 10 }, on: { height: 10 } });
      renderInstance.position_elements();

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
      }, 1000);
    });
  });

  describe("styling", () => {
    it("returns correct position styles if 'state' is 'active'", () => {
      renderInstance.setState({ state: "active", shape: { height: 10 }, on: { height: 10 } });
      const returnedStyles = renderInstance.get_position_styles();

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
      const returnedStyles = renderInstance.get_position_styles();

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
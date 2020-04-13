import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiToggle from "../../app/components/PackenUiToggle";

describe("<PackenUiToggle/>", () => {
  let render, renderInstance;
  const mockFunction = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenUiToggle
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

    it("toggles inner state if 'state' is 'active'", () => {
      render.setProps({ name:"toggle1", toggleHandler: mockFunction });
      renderInstance.setState({ state: "active" });
      renderInstance.toggle();

      expect(renderInstance.state.state).toBe("inactive");
      expect(renderInstance.props.toggleHandler).toHaveBeenCalledWith("toggle1", false);
    });

    it("toggles inner state if 'state' is 'inactive'", () => {
      render.setProps({ name:"toggle1", toggleHandler: mockFunction });
      renderInstance.setState({ state: "inactive" });
      renderInstance.toggle();

      expect(renderInstance.state.state).toBe("active");
      expect(renderInstance.props.toggleHandler).toHaveBeenCalledWith("toggle1", true);
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

    it("executes onLayout event callback for the shape", () => {
      const spyGetShapeDimensions = jest.spyOn(renderInstance, "getShapeDimensions");
      render.props().children.props.children.props.onLayout({
        nativeEvent: {
          layout: {
            width: 10,
            height: 10
          }
        }
      });

      expect(spyGetShapeDimensions).toHaveBeenCalled();
      spyGetShapeDimensions.mockRestore();
    });

    it("executes onLayout event callback for the dot", () => {
      const spyGetDotDimensions = jest.spyOn(renderInstance, "getDotDimensions");
      render.props().children.props.children.props.children[0].props.onLayout({
        nativeEvent: {
          layout: {
            width: 10,
            height: 10
          }
        }
      });

      expect(spyGetDotDimensions).toHaveBeenCalled();
      spyGetDotDimensions.mockRestore();
    });

    it("executes onLayout event callback for the on label", () => {
      const spyGetOnDimensions = jest.spyOn(renderInstance, "getOnDimensions");
      render.props().children.props.children.props.children[1].props.onLayout({
        nativeEvent: {
          layout: {
            width: 10,
            height: 10
          }
        }
      });

      expect(spyGetOnDimensions).toHaveBeenCalled();
      spyGetOnDimensions.mockRestore();
    });

    it("executes onLayout event callback for the on label", () => {
      const spyGetOffDimensions = jest.spyOn(renderInstance, "getOffDimensions");
      render.props().children.props.children.props.children[2].props.onLayout({
        nativeEvent: {
          layout: {
            width: 10,
            height: 10
          }
        }
      });

      expect(spyGetOffDimensions).toHaveBeenCalled();
      spyGetOffDimensions.mockRestore();
    });
  });

  describe("state changing", () => {
    it("sets initial state as 'active'", () => {
      render.setProps({ isActive: true });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toBe("active");
    });

    it("sets initial state as 'inactive'", () => {
      render.setProps({ isActive: false });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toBe("inactive");
    });

    it("sets disabled styles", () => {
      renderInstance.setDisabledStyles();

      expect(renderInstance.state.shape).toEqual({
        ...renderInstance.state.shape,
        disabled: {
          ...renderInstance.getStyles().shape.disabled
        }
      });
      expect(renderInstance.state.dot).toEqual({
        ...renderInstance.state.dot,
        disabled: {
          ...renderInstance.getStyles().dot.disabled
        }
      });
      expect(renderInstance.state.on).toEqual({
        ...renderInstance.state.on,
        disabled: {
          ...renderInstance.getStyles().label.on.disabled
        }
      });
      expect(renderInstance.state.off).toEqual({
        ...renderInstance.state.off,
        disabled: {
          ...renderInstance.getStyles().label.off.disabled
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
    it("returns correct position styles if 'state' is 'active' and is not disabled", () => {
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

    it("returns correct position styles if 'state' is 'inactive' and is not disabled", () => {
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

    it("returns correct position styles if 'state' is 'active' and is disabled", () => {
      renderInstance.setState({ isDisabled: true, initialState: "active", shape: { height: 10 }, on: { height: 10 } });
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
    
    it("returns correct position styles if 'state' is 'inactive' and is disabled", () => {
      renderInstance.setState({ isDisabled: true, initialState: "inactive", shape: { height: 10 }, off: { height: 10 } });
      renderInstance.state.isDisabled = true;
      renderInstance.state.initialState = "inactive";
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
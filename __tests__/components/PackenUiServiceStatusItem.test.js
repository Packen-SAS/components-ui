import "react-native";
import React from "react";
import { shallow } from "enzyme";
import { Animated } from "react-native";

import PackenUiServiceStatusItem from "../../app/components/PackenUiServiceStatusItem";

describe("<PackenUiServiceStatusItem/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();
  const steps = [
    {
      title: "Vehículo asignado",
      isComplete: true,
      isCurrent: false,
      time: "05:21 pm",
      callback: this.mockCallback
    },
    {
      title: "En camino a origen",
      subtitle: "Calle 71 # 13-81",
      isComplete: true,
      isCurrent: false,
      time: "05:21 pm",
      callback: this.mockCallback
    },
    {
      title: "En origen",
      subtitle: "Calle 71 # 13-81",
      isComplete: false,
      isCurrent: true,
      time: "05:21 pm",
      callback: this.mockCallback
    },
    {
      title: "Cargue completo",
      isComplete: false,
      isCurrent: false,
      callback: this.mockCallback
    },
    {
      title: "En camino a destino A",
      isComplete: false,
      isCurrent: false,
      callback: this.mockCallback
    },
    {
      title: "En destino A",
      isComplete: false,
      isCurrent: false,
      callback: this.mockCallback
    },
    {
      title: "Descargue completo",
      isComplete: false,
      isCurrent: false,
      callback: this.mockCallback
    },
    {
      title: "Finalizado",
      isComplete: false,
      isCurrent: false,
      callback: this.mockCallback
    }
  ];

  beforeAll(() => {
    render = shallow(
      <PackenUiServiceStatusItem
        key={2}
        index={2}
        data={steps[2]}
        currentStepIndex={2}
        itemsHeights={[0, 0, 0, 0, 0, 0, 0, 0]}
        setItemsHeights={mockCallback}
      />
    );
    renderInstance = render.instance();

    renderInstance.setState({
      state: "active",
      time: steps[2].time,
      dimensions: {
        box: {
          height: 0
        },
        line: {
          height: 0,
          bottom: 0
        }
      },
      activeScale: new Animated.Value(0)
    });
  });

  describe("styling", () => {
    it("returns the step's line positioning styles", () => {
      renderInstance.setState({
        altStyle: false,
        dimensions: {
          line: {
            height: 10,
            bottom: 10
          }
        },
        activeScale: new Animated.Value(0)
      });
      let returnedStyles = renderInstance.getLinePositioning();
      expect(returnedStyles.height).toBe(10);
      expect(returnedStyles.bottom).toBe(10);

      renderInstance.setState({ itemsHeights: [10] });
      [0, 1].forEach((index) => {
        renderInstance.setState({ altStyle: true, index });
        returnedStyles = renderInstance.getLinePositioning();
        expect(returnedStyles.top).toBe(3);
        expect(returnedStyles.left).toBe(5);
        expect(returnedStyles.height).toBe(index === 0 ? 4 : 35);
      });
      renderInstance.setState({ itemsHeights: [] });

      /**
       * This scenario should be impossible to reproduce, but it's just
       * to test the fallback values in case it does happen
       */
      renderInstance.setState({
        altStyle: true,
        dimensions: {
          line: {
            height: -6
          }
        }
      });
      returnedStyles = renderInstance.getLinePositioning();
      expect(returnedStyles.height).toBe(19);

      renderInstance.setState({
        altStyle: true,
        dimensions: {
          line: {
            height: 123
          }
        },
        activeScale: new Animated.Value(0)
      });
      renderInstance.setState({ itemsHeights: [10] });
      returnedStyles = renderInstance.getLinePositioning();
      expect(returnedStyles.height).toBe(148);

      renderInstance.setState({ dimensions: { line: { height: undefined } }, itemsHeights: [0] });
      returnedStyles = renderInstance.getLinePositioning();
      expect(returnedStyles.height).toBe(0);
    });

    it("returns the correct step's box styles if it's the first one", () => {
      render.setProps({
        index: 0
      });
      const returnedStyles = renderInstance.getBoxStyles();

      expect(returnedStyles.marginTop).toBe(0);
      expect(returnedStyles.zIndex).toBe(8);
    });

    it("returns the correct step's box styles if it's not the first one", () => {
      render.setProps({
        index: 2
      });
      const returnedStyles = renderInstance.getBoxStyles();

      expect(returnedStyles.marginTop).toBe(25);
      expect(returnedStyles.zIndex).toBe(6);
    });

    it("returns the previous' step box height if it's not the first one", () => {
      render.setProps({
        index: 2,
        itemsHeights: [0, 10, 0]
      });
      const returnedHeight = renderInstance.getPreviousBoxHeight();

      expect(returnedHeight).toBe(10);
    });

    it("returns 0 as the previous's step box height if it's the first one", () => {
      render.setProps({
        index: 0,
        itemsHeights: [10, 0, 0]
      });
      const returnedHeight = renderInstance.getPreviousBoxHeight();

      expect(returnedHeight).toBe(0);
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidUpdate", () => {
      const prevProps = {
        currentStepIndex: 0
      };
      render.setProps({
        currentStepIndex: 1
      });
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      const spyStartActiveAnim = jest.spyOn(renderInstance, "startActiveAnim");
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(spyStartActiveAnim).toHaveBeenCalled();
      expect(renderInstance.props.instance).toHaveBeenCalled();
      spyStartActiveAnim.mockRestore();
    });

    it("executes the onLayout callback for the main box", () => {
      const spySetBoxDimensions = jest.spyOn(renderInstance, "setBoxDimensions");
      render.props().onLayout({
        nativeEvent: {
          layout: {
            height: 10
          }
        }
      });

      expect(spySetBoxDimensions).toHaveBeenCalled();
      spySetBoxDimensions.mockRestore();
    });
  });

  describe("state changing", () => {
    it("returns 'active' as initial state if it's the current step", () => {
      render.setProps({
        data: {
          isComplete: false,
          isCurrent: true
        }
      });
      const returnedState = renderInstance.getInitialState();

      expect(returnedState).toBe("active");
    });

    it("returns 'completed' as initial state if it's a completed step", () => {
      render.setProps({
        data: {
          isComplete: true,
          isCurrent: false
        }
      });
      const returnedState = renderInstance.getInitialState();

      expect(returnedState).toBe("completed");
    });

    it("returns 'default' as initial state if it's neither the current nor a completed step", () => {
      render.setProps({
        data: {
          isComplete: false,
          isCurrent: false
        }
      });
      const returnedState = renderInstance.getInitialState();

      expect(returnedState).toBe("default");
    });

    it("sets current time", () => {
      renderInstance.setState({
        time: null
      });
      renderInstance.setCurrentTime(new Date());

      expect(renderInstance.state.time).not.toBe(null);
    });

    it("sets current time as AM if the date is set so", () => {
      renderInstance.setState({
        time: null
      });
      const date = new Date("Mon Mar 30 2020 10:55:35 GMT-0500");
      renderInstance.setCurrentTime(date);

      expect(renderInstance.state.time).not.toBe(null);
    });

    it("sets current time as PM if the date is set so", () => {
      renderInstance.setState({
        time: null
      });
      const date = new Date("Mon Mar 30 2020 16:55:35 GMT-0500");
      renderInstance.setCurrentTime(date);

      expect(renderInstance.state.time).not.toBe(null);
    });

    it("sets hours in a 12-hour format if it's not midnight (0 hours)", () => {
      renderInstance.setState({
        time: null
      });
      const date = new Date("Mon Mar 30 2020 16:55:35 GMT-0500");
      renderInstance.setCurrentTime(date);

      expect(renderInstance.state.time).not.toBe(null);
    });

    it("sets hours as 12 if it's actually midnight (0 hours)", () => {
      renderInstance.setState({
        time: null
      });
      const date = new Date("Mon Mar 30 2020 00:55:35 GMT-0500");
      renderInstance.setCurrentTime(date);

      expect(renderInstance.state.time).not.toBe(null);
    });

    it("sets minutes as is if it's not a single digit", () => {
      renderInstance.setState({
        time: null
      });
      const date = new Date("Mon Mar 30 2020 16:55:35 GMT-0500");
      renderInstance.setCurrentTime(date);

      expect(renderInstance.state.time).not.toBe(null);
    });

    it("appends a leading 0 to the minutes if it's a single digit", () => {
      renderInstance.setState({
        time: null
      });
      const date = new Date("Mon Mar 30 2020 16:05:35 GMT-0500");
      renderInstance.setCurrentTime(date);

      expect(renderInstance.state.time).not.toBe(null);
    });

    it("sets box dimensions", () => {
      render.setProps({
        index: 2,
        itemsHeights: [0, 10, 0, 0, 0, 0, 0, 0]
      });
      renderInstance.setState({ setItemsHeights: mockCallback });
      renderInstance.setBoxDimensions({
        nativeEvent: {
          layout: {
            height: 10
          }
        }
      });

      expect(renderInstance.state.dimensions.box.height).toBe(10);
      expect(renderInstance.state.dimensions.line.height).toBe(10);
      expect(renderInstance.state.dimensions.line.bottom).toBe(5);
      expect(mockCallback).toHaveBeenCalled();
    });

    it("returns false after setting the box dimensions if no callback is provided", () => {
      render.setProps({
        index: 2,
        itemsHeights: [0, 10, 0, 0, 0, 0, 0, 0]
      });
      renderInstance.setState({ setItemsHeights: undefined });
      const res = renderInstance.setBoxDimensions({
        nativeEvent: {
          layout: {
            height: 10
          }
        }
      });

      expect(res).toBe(false);
      expect(renderInstance.state.dimensions.box.height).toBe(10);
      expect(renderInstance.state.dimensions.line.height).toBe(10);
      expect(renderInstance.state.dimensions.line.bottom).toBe(5);
    });

    it("sets correct state if the step is the current one", () => {
      const spySetCurrentTime = jest.spyOn(renderInstance, "setCurrentTime");
      render.setProps({
        currentStepIndex: 0,
        index: 0
      });
      renderInstance.updateState();

      expect(renderInstance.state.state).toBe("active");
      expect(spySetCurrentTime).toHaveBeenCalled();
      spySetCurrentTime.mockRestore();
    });

    it("sets correct state if the step is completed", () => {
      render.setProps({
        currentStepIndex: 1,
        index: 0
      });
      renderInstance.updateState();

      expect(renderInstance.state.state).toBe("completed");
    });

    it("sets correct state if the step is not reached yet", () => {
      render.setProps({
        currentStepIndex: 0,
        index: 1
      });
      renderInstance.updateState();

      expect(renderInstance.state.state).toBe("default");
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        data: undefined,
        index: undefined,
        itemsHeights: undefined,
        setItemsHeights: undefined,
        currentStepIndex: undefined,
        styling: undefined
      });
      let res = renderInstance.setPropsToState();

      expect(res).toEqual({
        data: {
          title: "",
          label: false,
          subtitle: false,
          isComplete: false,
          isCurrent: false,
          time: "00:00"
        },
        index: 0,
        itemsHeights: [],
        setItemsHeights: false,
        currentStepIndex: -1,
        altStyle: false,
        styling: {
          box: {},
          sub: {},
          time: {},
          spacer: {},
          line: {},
          dot: {},
          dotIconSize: undefined,
          dotIconColor: undefined,
          main: {},
          title: {},
          subtitle: {}
        }
      });

      render.setProps({ styling: { test: "Test" } });
      res = renderInstance.setPropsToState();
      expect(res.styling).toEqual({ test: "Test" });
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders null if no initial time is provided", () => {
      render.setProps({
        data: {
          time: undefined
        }
      });
      const returnedElement = renderInstance.getInitialTime();

      expect(returnedElement).toBe(null);
    });

    it("renders a subtitle if provided", () => {
      render.setProps({
        data: {
          subtitle: steps[2].subtitle
        }
      });
      const returnedElement = renderInstance.getSubtitle();

      expect(returnedElement).toBeDefined();
    });

    it("renders null if no subtitle is provided", () => {
      render.setProps({
        data: {
          subtitle: undefined
        }
      });
      const returnedElement = renderInstance.getSubtitle();

      expect(returnedElement).toBe(null);
    });

    it("renders a line if it's not the first step", () => {
      render.setProps({
        index: 2
      });
      const returnedElement = renderInstance.getLine();

      expect(returnedElement).toBeDefined();
    });

    it("returns null as a line if it's the first step", () => {
      render.setProps({
        index: 0
      });
      const returnedElement = renderInstance.getLine();

      expect(returnedElement).toBe(null);
    });

    it("returns an icon for the dot if the step is completed", () => {
      renderInstance.setState({
        state: "completed"
      });
      let returnedElement = renderInstance.getDotIcon();
      expect(returnedElement).toBeDefined();

      renderInstance.setState({ styling: { dotIconColor: "#FFFFFF", dotIconSize: 15 } });
      returnedElement = renderInstance.getDotIcon();
      expect(returnedElement).toBeDefined();
    });

    it("returns null as an icon for the dot if the step is not completed", () => {
      renderInstance.setState({
        state: "default"
      });
      const returnedElement = renderInstance.getDotIcon();

      expect(returnedElement).toBe(null);
    });

    it("renders the initial time if provided", () => {
      render.setProps({
        data: {
          time: steps[2].time
        }
      });
      let returnedElement = renderInstance.getInitialTime();
      expect(returnedElement).toBeDefined();

      render.setProps({ styling: { time: { test: "Test" }, box: {} } });
      renderInstance.setState({ styling: false });
      returnedElement = renderInstance.getInitialTime();
      expect(returnedElement.props.style).toEqual({ ...renderInstance.getStyles().time, test: "Test" });
    });

    it("returns the label element", () => {
      renderInstance.setState({ data: { label: "test" } });
      let res = renderInstance.getLabel();
      expect(res).toBeDefined();

      renderInstance.setState({ data: { label: false } });
      res = renderInstance.getLabel();
      expect(res).toBeNull();
    });
  });
});
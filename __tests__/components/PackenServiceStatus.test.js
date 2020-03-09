import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenServiceStatus from "../../app/components/PackenServiceStatus";

describe("<PackenServiceStatus/>", () => {
  let render, renderInstance;
  const mock_callback = jest.fn();
  const mock_steps = [
    {
      title: "Solicitando Servicio",
      activeIcon: "clock",
      date: "Agosto 13, 2017",
      time: "05:08 pm",
      callback: mock_callback
    },
    {
      title: "Servicio Confirmado",
      activeIcon: "search",
      date: "Agosto 13, 2017",
      time: "05:13 pm",
      callback: mock_callback
    },
    {
      title: "Servicio Finalizado",
      activeIcon: "check-circle",
      date: "Agosto 13, 2017",
      time: "06:32 pm",
      callback: mock_callback
    }
  ];

  beforeAll(() => {
    render = renderer.create(
      <PackenServiceStatus
        steps={mock_steps}
        currentStepIndex={0}/>
    );

    renderInstance = render.getInstance();
    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      }
    };
    renderInstance.setState({
      finalSteps: [],
      currentStep: {}
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("updates current step", () => {
      renderInstance.setState({
        currentStep: {
          ...renderInstance.state.currentStep,
          callback: jest.fn()
        }
      });
      renderInstance.props = { steps: mock_steps, currentStepIndex: 0 };

      renderInstance.update_current_step();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.currentStep).toEqual({
          ...steps[0]
        });
        expect(renderInstance.state.currentStep.callback).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 1000);
    });
  });

  describe("triggering action", () => {
    it("executes correct code on componentDidUpdate", () => {
      const prevProps = { currentStepIndex: 0 };
      renderInstance.props = { currentStepIndex: 1 };
      renderInstance.update_current_step = jest.fn();
      renderInstance.componentDidUpdate(prevProps, null, null);
      expect(renderInstance.update_current_step).toHaveBeenCalled();
    });
  });
});
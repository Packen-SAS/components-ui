import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenServiceStatus from "../../app/components/PackenServiceStatus";

describe("<PackenServiceStatus/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();
  const mockSteps = [
    {
      title: "Solicitando Servicio",
      activeIcon: "clock",
      date: "Agosto 13, 2017",
      time: "05:08 pm",
      callback: mockCallback
    },
    {
      title: "Servicio Confirmado",
      activeIcon: "search",
      date: "Agosto 13, 2017",
      time: "05:13 pm",
      callback: mockCallback
    },
    {
      title: "Servicio Finalizado",
      activeIcon: "check-circle",
      date: "Agosto 13, 2017",
      time: "06:32 pm",
      callback: mockCallback
    }
  ];

  beforeAll(() => {
    render = renderer.create(
      <PackenServiceStatus
        steps={mockSteps}
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
      renderInstance.props = { steps: mockSteps, currentStepIndex: 0 };

      renderInstance.updateCurrentStep();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.currentStep).toEqual({
          ...mockSteps[0]
        });
        expect(renderInstance.state.currentStep.callback).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 4000);
    });
  });

  describe("triggering action", () => {
    it("executes correct code on componentDidUpdate", () => {
      const prevProps = { currentStepIndex: 0 };
      renderInstance.props = { currentStepIndex: 1 };
      renderInstance.updateCurrentStep = jest.fn();
      renderInstance.componentDidUpdate(prevProps, null, null);
      expect(renderInstance.updateCurrentStep).toHaveBeenCalled();
    });
  });
});
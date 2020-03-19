import "react-native";
import React from "react";
import { shallow } from "enzyme";

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
      callback: mockCallback,
      isComplete: false
    },
    {
      title: "Servicio Confirmado",
      activeIcon: "search",
      date: "Agosto 13, 2017",
      time: "05:13 pm",
      callback: mockCallback,
      isComplete: false
    },
    {
      title: "Servicio Finalizado",
      activeIcon: "check-circle",
      date: "Agosto 13, 2017",
      time: "06:32 pm",
      callback: mockCallback,
      isComplete: false
    }
  ];

  beforeAll(() => {
    render = shallow(
      <PackenServiceStatus
        steps={mockSteps}
        currentStepIndex={0}/>
    );
    renderInstance = render.instance();

    renderInstance.setState({
      finalSteps: [...mockSteps],
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
          callback: mockCallback
        }
      });
      render.setProps({
        steps: mockSteps,
        currentStepIndex: 0
      });
      renderInstance.updateCurrentStep();

      expect(renderInstance.state.currentStep).toEqual({
        ...mockSteps[0]
      });
      expect(renderInstance.state.currentStep.callback).toHaveBeenCalled();
    });
  });

  describe("triggering action", () => {
    it("executes correct code on componentDidUpdate", () => {
      const spyUpdateCurrentStep = jest.spyOn(renderInstance, "updateCurrentStep");
      const prevProps = { currentStepIndex: 0 };
      render.setProps({ currentStepIndex: 1 });
      renderInstance.componentDidUpdate(prevProps, null, null);
      
      expect(spyUpdateCurrentStep).toHaveBeenCalled();
      spyUpdateCurrentStep.mockRestore();
    });
  });
});
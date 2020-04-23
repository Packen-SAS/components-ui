import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiServiceStatus from "../../app/components/PackenUiServiceStatus";

describe("<PackenUiServiceStatus/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  const mockSteps = [
    {
      title: "Vehículo asignado",
      isComplete: true,
      isCurrent: false,
      time: "05:21 pm",
      callback: mockCallback
    },
    {
      title: "En camino a origen",
      subtitle: "Calle 71 # 13-81",
      isComplete: true,
      isCurrent: false,
      time: "05:21 pm",
      callback: mockCallback
    },
    {
      title: "En origen",
      subtitle: "Calle 71 # 13-81",
      isComplete: false,
      isCurrent: true,
      time: "05:21 pm",
      callback: mockCallback
    },
    {
      title: "Cargue completo",
      isComplete: false,
      isCurrent: false,
      callback: mockCallback
    },
    {
      title: "En camino a destino A",
      isComplete: false,
      isCurrent: false,
      callback: mockCallback
    },
    {
      title: "En destino A",
      isComplete: false,
      isCurrent: false,
      callback: mockCallback
    },
    {
      title: "Descargue completo",
      isComplete: false,
      isCurrent: false,
      callback: mockCallback
    },
    {
      title: "Finalizado",
      isComplete: false,
      isCurrent: false,
      callback: mockCallback
    }
  ];

  beforeAll(() => {
    render = shallow(
      <PackenUiServiceStatus
        steps={mockSteps}
        currentStepIndex={2}/>
    );
    renderInstance = render.instance();

    renderInstance.setState({
      steps: [...mockSteps],
      currentStepIndex: 2,
      itemsHeights: [0, 0, 0, 0, 0, 0, 0, 0]
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
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

  describe("state changing", () => {
    it("updates current step", () => {
      render.setProps({
        steps: [...mockSteps],
        currentStepIndex: 2
      });
      renderInstance.updateCurrentStep();

      expect(renderInstance.state.currentStepIndex).toBe(2);
      expect(renderInstance.state.steps[2].callback).toHaveBeenCalled();
    });

    it("sets items heights", () => {
      renderInstance.setItemsHeights(0, 10);

      expect(renderInstance.state.itemsHeights[0]).toBe(10);
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        steps: undefined,
        currentStepIndex: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        steps: [],
        currentStepIndex: -1
      });
    });
  });
});
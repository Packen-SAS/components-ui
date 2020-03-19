import "react-native";
import React from "react";
import { shallow } from "enzyme";

import ServiceStatus from "../../app/views/ServiceStatus";

describe("<ServiceStatus/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(<ServiceStatus />);
    renderInstance = render.instance();

    renderInstance.setState({
      currentStepIndex: 0,
      steps: [
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
      ]
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes mock callback", () => {
      const res = renderInstance.mockCallback()
      
      expect(res).toBe(true);
    });

    it("goes to the previous step if it's not currently the first one", () => {
      renderInstance.state.currentStepIndex = 1;
      renderInstance.back();

      expect(renderInstance.state.currentStepIndex).toBe(0);
    });

    it("stays at the same step if it's currently the first one", () => {
      renderInstance.state.currentStepIndex = 0;
      renderInstance.back();

      expect(renderInstance.state.currentStepIndex).toBe(0);
    });

    it("goes to the next step if it's not currently the last one", () => {
      renderInstance.state.currentStepIndex = 0;
      renderInstance.next();

      expect(renderInstance.state.currentStepIndex).toBe(1);
    });

    it("stays at the same step if it's currently the last one", () => {
      renderInstance.state.currentStepIndex = 2;
      renderInstance.next();

      expect(renderInstance.state.currentStepIndex).toBe(2);
    });
  });
});
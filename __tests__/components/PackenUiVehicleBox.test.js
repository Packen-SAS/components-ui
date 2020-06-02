import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";

import PackenUiVehicleBox from "../../app/components/PackenUiVehicleBox";

describe("<PackenUiVehicleBox/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenUiVehicleBox
        type="carry"
        overview="Camión con refrigeración"
        year="2017"
        plate="USC-914"
        state="approved"
        callback={mockCallback}
      />
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns the content without a touchable if not set so", () => {
      renderInstance.setState({ callback: undefined });
      const returnedElement = renderInstance.getContent();

      expect(returnedElement).toBeDefined();
    });

    it("returns the content with a touchable if set so", () => {
      renderInstance.setState({ callback: mockCallback });
      const returnedElement = renderInstance.getContent();

      expect(returnedElement).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("updates the state with the new, incoming props", () => {
      render.setProps({ type: "Test" });
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      expect(renderInstance.state.type).toBe("Test");
      spySetState.mockRestore();
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        type: undefined,
        overview: undefined,
        year: undefined,
        plate: undefined,
        state: undefined,
        callback: undefined,
        image: undefined,
        labels: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        type: "",
        overview: "",
        year: "",
        plate: "",
        state: "pending",
        callback: false,
        image: null,
        labels: {
          approved: "Aprobado",
          rejected: "Rechazado",
          pending: "Pendiente"
        }
      });
    });

    it("returns incoming props as the state key-value pairs if image and labels are provided", () => {
      const labels = {
        approved: "Aprobado",
        rejected: "Rechazado",
        pending: "Pendiente"
      };
      render.setProps({
        image: "test-url",
        labels: { ...labels }
      });
      const res = renderInstance.setPropsToState();

      expect(res.image).toBe("test-url");
      expect(res.labels).toEqual({ ...labels });
    });
  });

  describe("styling", () => {
    it("returns the styles object", () => {
      const returnedStyles = renderInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidUpdate", () => {
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate();

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
    });

    it("returns the rejected state object", () => {
      renderInstance.state.state = "rejected";
      const res = renderInstance.getState();

      expect(res).toEqual({
        label: "Rechazado",
        icon: {
          name: "alert-circle",
          color: Colors.danger.default
        }
      });
    });

    it("returns the blocked state object", () => {
      renderInstance.state.state = "blocked";
      const res = renderInstance.getState();

      expect(res).toEqual({
        label: "Rechazado",
        icon: {
          name: "alert-circle",
          color: Colors.danger.default
        }
      });
    });

    it("returns the pending state object", () => {
      renderInstance.state.state = "pending";
      const res = renderInstance.getState();

      expect(res).toEqual({
        label: "Pendiente",
        icon: {
          name: "pause-circle",
          color: Colors.basic.gray.drk
        }
      });
    });

    it("returns the approved state object", () => {
      renderInstance.state.state = "approved";
      const res = renderInstance.getState();

      expect(res).toEqual({
        label: "Aprobado",
        icon: {
          name: "check-circle",
          color: Colors.success.default
        }
      });
    });

    it("returns the taken state object", () => {
      renderInstance.state.state = "taken";
      const res = renderInstance.getState();

      expect(res).toEqual({
        label: "Aprobado",
        icon: {
          name: "check-circle",
          color: Colors.success.default
        }
      });
    });

    it("returns the custom image styles if it's not a motorcycle", () => {
      renderInstance.setState({ type: "carry" });
      const returnedStyles = renderInstance.getImgStyles();

      expect(returnedStyles).toEqual({ ...renderInstance.getStyles().img, width: 206, height: 95 });
    });

    it("returns the custom image styles if it's a motorcycle", () => {
      renderInstance.state.type = "moto";
      const returnedStyles = renderInstance.getImgStyles();

      expect(returnedStyles).toEqual({ width: 121, height: 80 });
    });
  });
});
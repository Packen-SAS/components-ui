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
        callback: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        type: "",
        overview: "",
        year: "",
        plate: "",
        state: "reviewing",
        callback: false
      });
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

    it("returns the default image object", () => {
      renderInstance.setState({ type: "" });
      const res = renderInstance.getImage();

      expect(res).toEqual({
        src: "",
        style: {
          width: 0,
          height: 0
        }
      });
    });

    it("returns the image object if it's a carry", () => {
      renderInstance.setState({ type: "carry" });
      const res = renderInstance.getImage();

      expect(res).toEqual({
        src: require("../../assets/images/carry.png"),
        style: {
          width: 202,
          height: 95
        }
      });
    });

    it("returns the image object if it's a npr", () => {
      renderInstance.setState({ type: "npr" });
      const res = renderInstance.getImage();

      expect(res).toEqual({
        src: require("../../assets/images/npr.png"),
        style: {
          width: 176,
          height: 95
        }
      });
    });

    it("returns the image object if it's a sencillo", () => {
      renderInstance.setState({ type: "sencillo" });
      const res = renderInstance.getImage();

      expect(res).toEqual({
        src: require("../../assets/images/sencillo.png"),
        style: {
          width: 213,
          height: 95
        }
      });
    });

    it("returns the image object if it's a tractomula", () => {
      renderInstance.setState({ type: "tractomula" });
      const res = renderInstance.getImage();

      expect(res).toEqual({
        src: require("../../assets/images/tractomula.png"),
        style: {
          width: 205,
          height: 95
        }
      });
    });

    it("returns the declined state object", () => {
      renderInstance.setState({ state: "declined" });
      const res = renderInstance.getState();

      expect(res).toEqual({
        label: "Rechazado",
        icon: {
          name: "alert-circle",
          color: Colors.danger.default
        }
      });
    });

    it("returns the reviewing state object", () => {
      renderInstance.setState({ state: "reviewing" });
      const res = renderInstance.getState();

      expect(res).toEqual({
        label: "En revisión",
        icon: {
          name: "pause-circle",
          color: Colors.basic.gray.drk
        }
      });
    });

    it("returns the approved state object", () => {
      renderInstance.setState({ state: "approved" });
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

      expect(returnedStyles).toEqual({ ...renderInstance.getStyles().img });
    });

    it("returns the custom image styles if it's a motorcycle", () => {
      renderInstance.setState({ type: "moto" });
      const returnedStyles = renderInstance.getImgStyles();

      expect(returnedStyles).toEqual({});
    });
  });
});
import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import PackenUiWhatsAppLink from "../../app/components/PackenUiWhatsAppLink";

describe("<PackenUiWhatsAppLink/>", () => {
  const render = shallow(
    <PackenUiWhatsAppLink
      visible
      text="Texto de prueba"
      style={{ justifyContent: "flex-start" }}
    />
  );
  const renderInstance = render.instance();

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();

      renderInstance.setState({ inverted: true });
      expect(render).toBeDefined();

      renderInstance.setState({ styling: { svgWidth: 10, svgHeight: 10 } });
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the callback trigger", () => {
      renderInstance.setState({ trigger: jest.fn() });
      renderInstance.trigger();
      expect(renderInstance.state.trigger).toHaveBeenCalled();

      renderInstance.setState({ trigger: undefined });
      const res = renderInstance.trigger();
      expect(res).toBe(undefined);
    });

    it("updates the state with new props", () => {
      const spySetPropsToState = jest.spyOn(renderInstance, "setPropsToState");
      renderInstance.updateState();
      expect(spySetPropsToState).toHaveBeenCalled();
      spySetPropsToState.mockRestore();
    });
  });

  describe("styling", () => {
    it("returns the styles array", () => {
      renderInstance.setState({ color: "#FFFFFF" });
      const res = renderInstance.getStyles();
      expect(res).toEqual({
        box: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          width: "auto",
          height: "auto",
          padding: 5
        },
        label: {
          textDecorationStyle: "solid",
          textDecorationLine: "underline",
          textTransform: "uppercase",
          fontSize: 12,
          color: "#FFFFFF",
          textDecorationColor: "#FFFFFF"
        }
      });
    });
  });

  describe("state changing", () => {
    it("executes the correct code on componentDidMount", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();
      expect(renderInstance.props.instance).toHaveBeenCalledWith(renderInstance);
    });

    it("executes the correct code on componentDidUpdate", () => {
      const prevProps = { test: "Test" };
      render.setProps({ test: "Test 2" });
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        style: undefined,
        text: undefined,
        trigger: undefined,
        visible: undefined,
        inverted: undefined,
        color: undefined,
        styling: undefined
      });
      let res = renderInstance.setPropsToState();

      expect(res).toEqual({
        style: {},
        text: "¿Necesitas ayuda?",
        trigger: false,
        visible: false,
        inverted: false,
        color: Colors.basic.independence.drk_alt,
        styling: {
          box: {},
          svgWidth: undefined,
          svgHeight: undefined,
          text: {}
        }
      });

      const mockCallback = jest.fn();
      render.setProps({
        trigger: mockCallback,
        inverted: true,
        color: "#FFFFFF"
      });
      res = renderInstance.setPropsToState();
      expect(res.trigger).toBe(mockCallback);
      expect(res.inverted).toBe(true);
      expect(res.color).toBe("#FFFFFF");

      render.setProps({ styling: { test: "Test" } });
      res = renderInstance.setPropsToState();
      expect(res.styling).toEqual({ test: "Test" });
    });
  })
});
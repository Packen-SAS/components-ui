import "react-native";
import React from "react";
import { shallow } from "enzyme";

import * as UTIL from "../../app/utils";
import Colors from "../../app/styles/abstracts/colors";
import PackenUiLicenseBox from "../../app/components/PackenUiLicenseBox";

describe("<PackenUiLicenseBox/>", () => {
  const mockCallback = jest.fn();
  const render = shallow(
    <PackenUiLicenseBox
      overview="Licencia para camión con refrigeración"
      category="A1"
      number="000000"
      state="approved"
      dueDate={UTIL.formatDateSimple("2021-08-14", "DD/MM/YYYY")}
      callback={mockCallback}
      labels={{
        approved: "Approved",
        expired: "Expired",
        rejected: "Rejected",
        pending: "Pending"
      }}
    />
  );
  const renderInstance = render.instance();

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("returns the license state object", () => {
      let res = renderInstance.getLicenseState("approved");
      expect(res).toEqual({ label: "Approved", bg: Colors.success.default, text: Colors.white.default });

      res = renderInstance.getLicenseState("expired");
      expect(res).toEqual({ label: "Expired", bg: Colors.basic.gray.dft, text: Colors.white.default });

      res = renderInstance.getLicenseState("blocked");
      expect(res).toEqual({ label: "Rejected", bg: Colors.danger.default, text: Colors.white.default });

      res = renderInstance.getLicenseState("pending");
      expect(res).toEqual({ label: "Pending", bg: Colors.warning.default, text: Colors.white.default });
    });

    it("returns the color for the due date label depending on its state", () => {
      const res = renderInstance.getDueDateState("2025-08-14");
      expect(res).toBe(Colors.danger.default);
    });

    it("executes the placeholder function", () => {
      const res = renderInstance.mockCallback();
      expect(res).toBe(true);
    });
  });

  describe("state changing", () => {
    it("executes the correct code on componentDidUpdate", () => {
      const prevProps = { test: "Test" };
      render.setProps({ test: "Test 2" });
      const spySetPropsToState = jest.spyOn(renderInstance, "setPropsToState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spySetPropsToState).toHaveBeenCalled();
      spySetPropsToState.mockRestore();
    });

    it("returns incoming props as the state key-value pairs if none are defined", () => {
      render.setProps({
        overview: undefined,
        category: undefined,
        number: undefined,
        state: undefined,
        dueDate: undefined,
        callback: undefined,
        labels: undefined,
        styling: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        overview: null,
        category: null,
        number: null,
        state: null,
        dueDate: null,
        callback: renderInstance.mockCallback,
        labels: {
          approved: "Aprobado",
          expired: "Expirado",
          rejected: "Rechazado",
          pending: "Pendiente"
        },
        styling: {
          box: {},
          top: {},
          overview: {},
          bottom: {}
        }
      });
    });

    it("returns incoming props as the state key-value pairs if some are provided", () => {
      render.setProps({ styling: { test: "Test" } });
      const res = renderInstance.setPropsToState();
      expect(res.styling).toEqual({ test: "Test" });
    });
  })
});
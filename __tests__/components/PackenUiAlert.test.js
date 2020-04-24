import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiAlert from "../../app/components/PackenUiAlert";

describe("<PackenUiAlert/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenUiAlert
        type="static"
        theme="default"
        text={{
          main: "Alerta gris para información default",
          preset: "c2"
        }}
        onClose={mockCallback}
      />
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns the title if provided", () => {
      renderInstance.setState({ text: { title: "Test", main: "Test 2", preset: undefined } });
      const returnedTitle = renderInstance.getTitle();
      
      expect(returnedTitle).toBe("Test: ");
    });

    it("returns an empty string as the title if not provided", () => {
      renderInstance.setState({ text: { title: "", main: "Test 2", preset: undefined } });
      const returnedTitle = renderInstance.getTitle();
      
      expect(returnedTitle).toBe("");
    });
  });

  describe("triggering actions", () => {
    it("executes the close callback to ba handled by the parent component", () => {
      renderInstance.setState({ onClose: mockCallback });
      renderInstance.close();

      expect(renderInstance.state.onClose).toHaveBeenCalled();
    });

    it("returns false while executing the close callback if not provided", () => {
      renderInstance.setState({ onClose: false });
      const res = renderInstance.close();

      expect(res).toBe(false);
    });

    it("executes the correct code on componentDidUpdate", () => {
      const prevProps = { test: "Test" };
      render.setProps({ test: "Test 2" });
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("executes the correct code on componentDidUpdate", () => {
      const spyCheckIfTimed = jest.spyOn(renderInstance, "checkIfTimed");
      renderInstance.componentDidMount();

      expect(spyCheckIfTimed).toHaveBeenCalled();
      spyCheckIfTimed.mockRestore();
    });

    it("starts a timeout to close the alert if set so", () => {
      renderInstance.setState({
        type: "timed",
        countdown: 5000
      });

      setTimeout(() => {
        expect(spyClose).toHaveBeenCalled();
        spyClose.mockRestore();
        done();
      }, 6000);
    });

    it("returns false while starting a timeout to close the alert if not set so", () => {
      renderInstance.setState({
        type: "static",
        countdown: false
      });
      const res = renderInstance.checkIfTimed();
      
      expect(res).toBe(false);
    });
  });

  describe("state changing", () => {
    it("updates the state", () => {
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        type: undefined,
        theme: undefined,
        text: undefined,
        onClose: undefined,
        countdown: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        type: "static",
        theme: "default",
        text: {
          title: "",
          main: "",
          preset: undefined
        },
        onClose: false,
        countdown: false
      });
    });

    it("returns incoming props as the state key-value pairs if a countdown is provided", () => {
      render.setProps({
        type: "timed",
        countdown: 5000
      });
      const res = renderInstance.setPropsToState();

      expect(res.countdown).toBe(5000);
    });
  });

  describe("styling", () => {
    it("returns the main icon name if the theme is 'success'", () => {
      renderInstance.setState({ theme: "success" });
      const returnedName = renderInstance.getIconName();

      expect(returnedName).toBe("check-circle");
    });

    it("returns the main icon name if the theme is 'warning' or 'danger'", () => {
      renderInstance.setState({ theme: "warning" });
      const returnedName = renderInstance.getIconName();

      expect(returnedName).toBe("alert-triangle");
    });

    it("returns the main icon name if the theme is 'default', 'primary', 'info' or not provided", () => {
      renderInstance.setState({ theme: "default" });
      const returnedName = renderInstance.getIconName();

      expect(returnedName).toBe("info");
    });
  });
});
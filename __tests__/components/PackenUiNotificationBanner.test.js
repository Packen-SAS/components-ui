import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiNotificationBanner from "../../app/components/PackenUiNotificationBanner";

describe("<PackenUiNotificationBanner/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiNotificationBanner
        theme="success"
        type="default"
        icon="check"
        title="Success notification"
      />
    );
    renderInstance = render.instance();

    renderInstance.setState({
      theme: "success",
      type: "default"
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns an icon if provided via props", () => {
      renderInstance.setState({ icon: "check" });
      const returnedElement = renderInstance.getIcon();

      expect(returnedElement.props.name).toBe("check");
    });

    it("returns a Packen logo image if set so via props", () => {
      const themes = ["success", "primary", "warning", "danger", "info"];
      const srcs = [
        require("../../assets/images/arrow_packen_success.png"),
        require("../../assets/images/arrow_packen_primary.png"),
        require("../../assets/images/arrow_packen_warning.png"),
        require("../../assets/images/arrow_packen_danger.png"),
        require("../../assets/images/arrow_packen_info.png")
      ];
      renderInstance.setState({ icon: "packen" });

      themes.forEach((theme, i) => {
        renderInstance.setState({ theme: theme });
        const returnedElement = renderInstance.getIcon();

        expect(returnedElement.props.source).toBe(srcs[i]);
      });
    });

    it("returns null if no icon is provided via props", () => {
      renderInstance.setState({ icon: undefined });
      const returnedElement = renderInstance.getIcon();

      expect(returnedElement).toBe(null);
    });
  });

  describe("triggering actions", () => {
    it("executes componentDidUpdate handler", () => {
      const prevProps = { test: "Test" };
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
    });
  });

  describe("state changing", () => {
    it("updates the state with new, incoming props", () => {
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        title: undefined,
        theme: undefined,
        type: undefined,
        icon: undefined,
        styling: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        title: "",
        theme: "primary",
        type: "accent",
        icon: "packen",
        styling: {
          box: {},
          title: {},
          logo: {},
          icon: {},
          iconSize: undefined,
          iconColor: undefined
        }
      });
    });
  });
});
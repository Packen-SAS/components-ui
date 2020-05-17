import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiMapPin from "../../app/components/PackenUiMapPin";

describe("<PackenUiMapPin/>", () => {
  let renderIcon, renderInfo, renderInfoInstance;

  beforeAll(() => {
    renderIcon = shallow(
      <PackenUiMapPin
        type="icon"
        sub={{
          icon: "box"
        }}
        dotPosition="top"
      />
    );

    renderInfo = shallow(
      <PackenUiMapPin
        type="info"
        theme="primary"
        sub={{
          icon: "box",
          position: "right"
        }}
        main={{
          label: "DE",
          text: "Calle 71 # 13 - 81"
        }}
        dotPosition="bottom"
      />
    );
    renderInfoInstance = renderInfo.instance();
    
    renderInfoInstance.setState({
      main: {
        label: "DE",
        text: "Calle 71 # 13 - 81"
      },
      sub: {
        icon: "box",
        position: "right"
      },
      theme: "primary",
      type: "info",
      dotPosition: "bottom"
    });
  });

  describe("rendering", () => {
    it("renders an icon pin correctly", () => {
      expect(renderIcon).toBeDefined();
    });

    it("renders an information pin correctly", () => {
      renderInfoInstance.setState({
        sub: {
          icon: "check",
          character: undefined,
          position: "left",
          dotPosition: "bottom"
        }
      });
      expect(renderInfo).toBeDefined();
    });

    it("renders a label if passed via props", () => {
      renderInfo.setProps({
        type: "info",
        theme: "primary",
        main: {
          label: "De",
          text: "Test"
        },
        sub: {
          icon: "check",
          character: undefined,
          position: "left",
          dotPosition: "bottom"
        }
      });
      const returnedElement = renderInfoInstance.getLabel();

      expect(returnedElement).toBeDefined();
    });

    it("doesn't render a label if none is passed via props", () => {
      renderInfoInstance.setState({ main: { label: undefined } });
      const returnedElement = renderInfoInstance.getLabel();

      expect(returnedElement).toBe(null);
    });
  });

  describe("state changing", () => {
    it("returns incoming props as the state key-valur pairs", () => {
      renderInfo.setProps({
        main: undefined,
        sub: undefined,
        theme: undefined,
        type: undefined,
        dotPosition: undefined
      });
      const res = renderInfoInstance.setPropsToState();

      expect(res).toEqual({
        main: {
          label: "",
          text: ""
        },
        sub: false,
        theme: "primary",
        type: "info",
        dotPosition: false
      });
    });
  });

  describe("triggering actions", () => {
    it("executes the instance callback on componentDidMount if provided", () => {
      renderInfo.setProps({ instance: jest.fn() });
      renderInfoInstance.componentDidMount();

      expect(renderInfoInstance.props.instance).toHaveBeenCalled();
    });
  });
});
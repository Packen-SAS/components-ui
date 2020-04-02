import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenMapPin from "../../app/components/PackenMapPin";

describe("<PackenMapPin/>", () => {
  let renderIcon, renderInfo, renderInfoInstance;

  beforeAll(() => {
    renderIcon = shallow(
      <PackenMapPin
        type="icon"
        sub={{
          icon: "box"
        }}
        dotPosition="top"
      />
    );

    renderInfo = shallow(
      <PackenMapPin
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
  });

  describe("rendering", () => {
    it("renders an icon pin correctly", () => {
      expect(renderIcon).toBeDefined();
    });

    it("renders an information pin correctly", () => {
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
      renderInfo.setProps({
        type: "info",
        theme: "primary",
        main: {
          label: undefined,
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

      expect(returnedElement).toBe(null);
    });
  });
});
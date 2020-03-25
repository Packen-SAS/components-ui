import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenMapPin from "../../app/components/PackenMapPin";

describe("<PackenMapPin/>", () => {
  let renderIcon, renderInfo;

  beforeAll(() => {
    renderIcon = renderer.create(
      <PackenMapPin
        type="icon"
        sub={{
          icon: "box"
        }}
        dotPosition="top"
      />
    );

    renderInfo = renderer.create(
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
  });

  describe("rendering", () => {
    it("renders an icon pin correctly", () => {
      expect(renderIcon).toBeDefined();
    });

    it("renders an information pin correctly", () => {
      expect(renderInfo).toBeDefined();
    });
  });
});
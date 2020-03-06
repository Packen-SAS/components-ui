import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenAvatar from "../../app/components/PackenAvatar";

describe("<PackenAvatar/>", () => {
  const render = renderer.create(
    <PackenAvatar size="tiny" src={require("../../assets/images/avatar.jpg")}/>
  );

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
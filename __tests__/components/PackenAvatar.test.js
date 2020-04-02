import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenAvatar from "../../app/components/PackenAvatar";

describe("<PackenAvatar/>", () => {
  const render = shallow(
    <PackenAvatar size="tiny" src={require("../../assets/images/avatar.jpg")}/>
  );

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
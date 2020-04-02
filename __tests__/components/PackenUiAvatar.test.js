import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiAvatar from "../../app/components/PackenUiAvatar";

describe("<PackenUiAvatar/>", () => {
  const render = shallow(
    <PackenUiAvatar size="tiny" src={require("../../assets/images/avatar.jpg")}/>
  );

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
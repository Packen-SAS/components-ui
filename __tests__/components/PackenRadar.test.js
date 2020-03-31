import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenRadar from "../../app/components/PackenRadar";

describe("<PackenRadar/>", () => {
  const render = shallow(<PackenRadar theme="search" />);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
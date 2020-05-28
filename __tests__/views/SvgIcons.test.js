import "react-native";
import React from "react";
import { shallow } from "enzyme";

import SvgIcons from "../../app/views/SvgIcons";

describe("<SvgIcons/>", () => {
  const render = shallow(<SvgIcons/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
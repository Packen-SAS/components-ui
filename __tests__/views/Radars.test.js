import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Radars from "../../app/views/Radars";

describe("<Radars/>", () => {
  const render = shallow(<Radars/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
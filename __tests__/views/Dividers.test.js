import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Dividers from "../../app/views/Dividers";

describe("<Dividers/>", () => {
  const render = shallow(<Dividers/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
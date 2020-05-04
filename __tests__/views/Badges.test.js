import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Badges from "../../app/views/Badges";

describe("<Badges/>", () => {
  const render = shallow(<Badges/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
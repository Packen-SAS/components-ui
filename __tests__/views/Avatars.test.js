import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Avatars from "../../app/views/Avatars";

describe("<Avatars/>", () => {
  const render = shallow(<Avatars/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
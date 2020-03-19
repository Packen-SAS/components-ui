import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Inputs from "../../app/views/Inputs";

describe("<Inputs/>", () => {
  const render = shallow(<Inputs/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes event callback", () => {
      const res = render.instance().handleChangeText("Test");

      expect(res).toBe("Test");
    });
  });
});
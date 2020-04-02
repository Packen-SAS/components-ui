import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Buttons from "../../app/views/Buttons";

describe("<Buttons/>", () => {
  const render = shallow(<Buttons/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes mock callback", () => {
      const res = render.instance().mockCallback();
      
      expect(res).toBe(true);
    });
  });
});
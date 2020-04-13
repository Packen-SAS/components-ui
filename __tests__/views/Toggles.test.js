import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Toggles from "../../app/views/Toggles";

describe("<Toggles/>", () => {
  const render = shallow(<Toggles/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the toggle handler", () => {
      const res = render.instance().toggleHandler("toggle1", true);

      expect(res).toBe(true);
    });
  });
});
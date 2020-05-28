import "react-native";
import React from "react";
import { shallow } from "enzyme";

import InputBoxes from "../../app/views/InputBoxes";

describe("<InputBoxes/>", () => {
  const render = shallow(<InputBoxes/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the mock callback", () => {
      const res = render.instance().mockCallback();
      expect(res).toBe(false);
    });
  });
});
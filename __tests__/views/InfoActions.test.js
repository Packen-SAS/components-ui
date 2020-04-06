import "react-native";
import React from "react";
import { shallow } from "enzyme";

import InfoActions from "../../app/views/InfoActions";

describe("<InfoActions/>", () => {
  const render = shallow(<InfoActions/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the mock callback", () => {
      const res = render.instance().mockCallback();

      expect(res).toBe(true);
    })
  });
});
import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Headers from "../../app/views/Headers";

describe("<Headers/>", () => {
  const render = shallow(<Headers/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the mockCallback", () => {
      const res = render.instance().mockCallback();

      expect(res).toBe(true);
    });
  });
});
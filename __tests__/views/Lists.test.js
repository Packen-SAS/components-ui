import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Lists from "../../app/views/Lists";

describe("<Lists/>", () => {
  const render = shallow(<Lists/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the mock callback", () => {
      const res = render.instance().mockCallback();

      expect(res).toBe(true);
    });
  });
});
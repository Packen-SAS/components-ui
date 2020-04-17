import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Radios from "../../app/views/Radios";

describe("<Radios/>", () => {
  const render = shallow(<Radios/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the handler function", () => {
      const res = render.instance().handleNotify("radios1", "Test");
      
      expect(res).toEqual({
        id: "radios1",
        value: "Test"
      });
    });
  });
});
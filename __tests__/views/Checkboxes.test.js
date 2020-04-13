import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Checkboxes from "../../app/views/Checkboxes";

describe("<Checkboxes/>", () => {
  const render = shallow(<Checkboxes/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes handler function", () => {
      const res = render.instance().handleNotify("checkbox1", "Test");
      
      expect(res).toEqual({
        id: "checkbox1",
        value: "Test"
      });
    });
  });
});
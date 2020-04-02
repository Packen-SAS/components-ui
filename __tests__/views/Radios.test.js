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
    it("executes handle functions", () => {
      const res = render.instance().handleNotify("Test");
      const res2 = render.instance().handleNotifyRow("Test 2");
      
      expect(res).toBe("Test");
      expect(res2).toBe("Test 2");
    });
  });
});
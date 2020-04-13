import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Dropdowns from "../../app/views/Dropdowns";

describe("<Dropdowns/>", () => {
  const render = shallow(<Dropdowns/>);

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

    it("executes the change handler", () => {
      const res = render.instance().changeHandler("dropdown1", ["Test"]);

      expect(res).toEqual({
        id: "dropdown1",
        value: ["Test"]
      });
    });
  });
});
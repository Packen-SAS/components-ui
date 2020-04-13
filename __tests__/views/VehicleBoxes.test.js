import "react-native";
import React from "react";
import { shallow } from "enzyme";

import VehicleBoxes from "../../app/views/VehicleBoxes";

describe("<VehicleBoxes/>", () => {
  const render = shallow(<VehicleBoxes/>);

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
import "react-native";
import React from "react";
import { shallow } from "enzyme";

import LicenseBoxes from "../../app/views/LicenseBoxes";

describe("<LicenseBoxes/>", () => {
  const render = shallow(<LicenseBoxes/>);

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
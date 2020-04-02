import "react-native";
import React from "react";
import { shallow } from "enzyme";

import MapPins from "../../app/views/MapPins";

describe("<MapPins/>", () => {
  const render = shallow(<MapPins/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
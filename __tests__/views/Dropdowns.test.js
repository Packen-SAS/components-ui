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
    const res = render.instance().mockCallback();

    expect(res).toBe(true);
  });
});
import "react-native";
import React from "react";
import { shallow } from "enzyme";

import IconTexts from "../../app/views/IconTexts";

describe("<IconTexts/>", () => {
  const render = shallow(<IconTexts/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("execeutes the mock callback", () => {
      const res = render.instance().mockCallback();

      expect(res).toBe(true);
    });
  });
});
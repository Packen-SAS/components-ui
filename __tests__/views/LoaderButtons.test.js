import "react-native";
import React from "react";
import { shallow } from "enzyme";

import LoaderButtons from "../../app/views/LoaderButtons";

describe("<LoaderButtons/>", () => {
  const render = shallow(<LoaderButtons/>);

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

  describe("state changing", () => {
    it("updates the state to finished", () => {
      const res = render.instance().finish();
      
      expect(res).toBe(true);
    });
  });
});
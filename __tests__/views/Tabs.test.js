import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Tabs from "../../app/views/Tabs";

describe("<Tabs/>", () => {
  const render = shallow(<Tabs/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes mockCallback", () => {
      const res = render.instance().mockCallback();

      expect(res).toBe(true);
    });

    it("executes onTabChange", () => {
      const res = render.instance().onTabChange();

      expect(res).toBe(true);
    });
  });
});
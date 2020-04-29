import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Alerts from "../../app/views/Alerts";

describe("<Alerts/>", () => {
  const render = shallow(<Alerts/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the onCloseHandler", () => {
      const res = render.instance().onCloseHandler();

      expect(res).toBe(true);
    });
  });
});
import "react-native";
import React from "react";
import { shallow } from "enzyme";

import NotificationBanners from "../../app/views/NotificationBanners";

describe("<NotificationBanners/>", () => {
  const render = shallow(<NotificationBanners/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
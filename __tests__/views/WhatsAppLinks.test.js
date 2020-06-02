import "react-native";
import React from "react";
import { shallow } from "enzyme";

import WhatsAppLinks from "../../app/views/WhatsAppLinks";

describe("<WhatsAppLinks/>", () => {
  const render = shallow(<WhatsAppLinks/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
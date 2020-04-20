import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PageView from "../../app/views/PageView";

describe("<PageView/>", () => {
  let render;

  beforeAll(() => {
    render = shallow(<PageView/>);
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
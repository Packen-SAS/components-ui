import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenTag from "../../app/components/PackenTag";

describe("<PackenTag/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenTag>Test</PackenTag>
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
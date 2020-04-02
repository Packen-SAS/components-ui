import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiTag from "../../app/components/PackenUiTag";

describe("<PackenUiTag/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiTag>Test</PackenUiTag>
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });
});
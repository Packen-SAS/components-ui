import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiDivider from "../../app/components/PackenUiDivider";

describe("<PackenUiDivider/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiDivider size={1} margin={{top: 10, bottom: 10}} type="light"/>
    );
    
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("styling", () => {
    it("sets correct styles", () => {
      expect(render.props().style.height).toBe(1);
      expect(render.props().style.marginTop).toBe(10);
      expect(render.props().style.marginBottom).toBe(10);
      expect(render.props().style.width).toBe(renderInstance.getStyles().base.width);
      expect(render.props().style.alignItems).toBe(renderInstance.getStyles().base.alignItems);
      expect(render.props().style.backgroundColor).toBe(renderInstance.getStyles().type.light.backgroundColor);
    });

    it("sets correct styles if no margins are provided via props", () => {
      render.setProps({
        size: 1,
        type: "light",
        margin: undefined
      });
      
      expect(render.props().style.marginTop).toBe(0);
      expect(render.props().style.marginBottom).toBe(0);
    });
  });
});
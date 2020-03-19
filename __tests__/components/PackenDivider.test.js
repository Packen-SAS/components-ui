import "react-native";
import React from "react";
import { shallow } from "enzyme";

import * as DividerStyles from "../../app/styles/components/PackenDivider";
import PackenDivider from "../../app/components/PackenDivider";

describe("<PackenDivider/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenDivider size={1} margin={{top: 10, bottom: 10}} type="light"/>
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
      expect(render.props().style.width).toBe(DividerStyles.light.width);
      expect(render.props().style.alignItems).toBe(DividerStyles.light.alignItems);
      expect(render.props().style.backgroundColor).toBe(DividerStyles.light.backgroundColor);
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
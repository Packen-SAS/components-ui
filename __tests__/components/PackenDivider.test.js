import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import * as DividerStyles from "../../app/styles/components/PackenDivider";
import PackenDivider from "../../app/components/PackenDivider";

describe("<PackenDivider/>", () => {
  let render, renderInstance, renderedJSON;

  beforeAll(() => {
    render = renderer.create(
      <PackenDivider size={1} margin={{top: 10, bottom: 10}} type="light"/>
    );
    
    renderInstance = render.getInstance();
    renderedJSON = render.toJSON();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("styling", () => {
    it("sets correct styles", () => {
      expect(renderedJSON.props.style.height).toBe(1);
      expect(renderedJSON.props.style.marginTop).toBe(10);
      expect(renderedJSON.props.style.marginBottom).toBe(10);
      expect(renderedJSON.props.style.width).toBe(DividerStyles.light.width);
      expect(renderedJSON.props.style.alignItems).toBe(DividerStyles.light.alignItems);
      expect(renderedJSON.props.style.backgroundColor).toBe(DividerStyles.light.backgroundColor);
    });
  });
});
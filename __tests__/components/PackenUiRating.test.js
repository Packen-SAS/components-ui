import PackenUiRating from "../../app/components/PackenUiRating";
import { shallow } from "enzyme";
import React from "react";

describe("<PackenUiRating/>", () => {
  let render, instance, renderReadonly;
  const mockOnRating = jest.fn();
  const mockConfig = {
    stars: 5,
    defaultRating: 0,
    readonly: false,
    size: 35
  };
  const readonlyConfig = { ...mockConfig, readonly: true };
  beforeAll(() => {
    render = shallow(<PackenUiRating config={mockConfig} onRating={mockOnRating} />);
    instance = render.instance();
    renderReadonly = shallow(<PackenUiRating config={readonlyConfig} onRating={mockOnRating} />);
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
      expect(renderReadonly).toBeDefined();
    });

    it("returns each star data as a component to be rendered", () => {
      [true, false].forEach((state) => {
        const spyHandleRating = jest.spyOn(instance, "handleRating");
        const res = instance.starsMapped({ id: 1, rated: state });
        expect(res).toBeDefined();
        res.props.onPress();
        expect(spyHandleRating).toHaveBeenCalledWith(1);
      });
    });

    it("returns stars as static, non-touchable elements", () => {
      [
        { size: 35, defaultRating: 0 },
        { size: undefined, defaultRating: 3 }
      ].forEach((state) => {
        const config = { ...mockConfig };
        config.defaultRating = state.defaultRating;
        config.size = state.size;
        render.setProps({ config });
        const res = instance.starsReadonly();
        expect(res).toBeDefined();
      });
    });
  });

  describe("state update", () => {
    it("updates the selected rating", () => {
      [35, undefined].forEach((val) => {
        const config = { ...mockConfig };
        config.size = val;
        render.setProps({ config });
        instance.handleRating(2);
        expect(instance.state.stars).toEqual([
          { id: 1, rated: true },
          { id: 2, rated: true },
          { id: 3, rated: false },
          { id: 4, rated: false },
          { id: 5, rated: false }
        ]);
        expect(mockOnRating).toHaveBeenCalledWith(2);
      });
    });
  });
});
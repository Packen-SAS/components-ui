import PackenUiIconInfo from "../../app/components/PackenUiIconInfo";
import { shallow } from "enzyme";
import React from "react";

describe("<PackenUiIconInfo/>", () => {
  let render, instance;
  beforeAll(() => {
    render = shallow(
      <PackenUiIconInfo
        icon="test"
        label="label"
        title="title"
      />
    );
    instance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns an icon from the provided set", () => {
      ["FA", "MCI", "FTR", "test"].forEach((set) => {
        instance.setState({ iconSet: set });
        const res = instance.getIcon();
        expect(res).toBeDefined();
      });
    });

    it("returns the main content elements", () => {
      ["test", false].forEach((children) => {
        instance.setState({ children });
        let res = instance.getContent();
        expect(res).toBeDefined();
        if (children) { expect(res).toBe("test"); }
      });
    });
  });

  describe("state update", () => {
    it("returns incoming props as the state key-value pairs (uncovered cases)", () => {
      render.setProps({ icon: undefined, label: undefined, title: undefined, styling: { test: "test" } });
      const res = instance.setPropsToState();
      expect(res.icon).toBe("box");
      expect(res.label).toBe("");
      expect(res.title).toBe("");
      expect(res.styling).toEqual({ test: "test" });
    });
  });

  describe("styling", () => {
    it("returns the 'disabled' state styles", () => {
      [true, false].forEach((state) => {
        instance.setState({ disabled: state });
        const res = instance.getDisabledStyles();
        expect(res).toEqual(state ? { opacity: 0.35 } : {});
      });
    });
  });
});
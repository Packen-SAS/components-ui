import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiInfoAction from "../../app/components/PackenUiInfoAction";

describe("<PackenUiInfoAction/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiInfoAction
        theme="success"
        title="Cara 1"
        caption="(Lado de la fotografía)"
        subtitle="Listo"
        callback={this.mockCallback}
        img={{
          src: require("../../assets/images/i-cara-1.png"),
          height: 19,
          width: 19
        }}
        icon={{
          name: "play",
          size: 14
        }}
      />
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns a caption if provided", () => {
      render.setProps({ caption: "Test" });
      const returnedElement = renderInstance.getCaption();

      expect(returnedElement).toBeDefined();
    });

    it("returns null as caption if not provided", () => {
      render.setProps({ caption: undefined });
      const returnedElement = renderInstance.getCaption();

      expect(returnedElement).toBe(null);
    });

    it("returns a subtitle if provided", () => {
      render.setProps({ subtitle: "Test" });
      const returnedElement = renderInstance.getSubtitle();

      expect(returnedElement).toBeDefined();
    });

    it("returns a subtitle without icon if provided and set so", () => {
      render.setProps({ subtitle: "Test", theme: "primary" });
      const returnedElement = renderInstance.getSubtitle();

      expect(returnedElement).toBeDefined();
    });

    it("returns a subtitle with a success icon if provided and set so", () => {
      render.setProps({ subtitle: "Test", theme: "success" });
      const returnedElement = renderInstance.getSubtitle();

      expect(returnedElement).toBeDefined();
    });

    it("returns a subtitle with an error icon if provided and set so", () => {
      render.setProps({ subtitle: "Test", theme: "danger" });
      const returnedElement = renderInstance.getSubtitle();

      expect(returnedElement).toBeDefined();
    });

    it("returns null as subtitle if not provided", () => {
      render.setProps({ subtitle: undefined });
      const returnedElement = renderInstance.getSubtitle();

      expect(returnedElement).toBe(null);
    });
  });

  describe("styling", () => {
    it("returns a styles object", () => {
      const returnedStyles = renderInstance.createStyles();

      expect(returnedStyles).toBeDefined();
    });
  });
});
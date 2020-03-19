import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Section from "../../app/components/Section";

describe("<Section/>", () => {
  const render = shallow(
    <Section title="Test title">Test content</Section>
  );

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders title correctly", () => {
      expect(render.props().children[0].props.children).toBe("Test title");
    });

    it("render contetn correctly", () => {
      expect(render.props().children[1]).toBe("Test content");
    });
  });
});
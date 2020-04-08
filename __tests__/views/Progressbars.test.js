import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Progressbars from "../../app/views/Progressbars";

describe("<Progressbars/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(<Progressbars/>);
    renderInstance = render.instance();

    renderInstance.setState({
      progress: 0.3,
      isComplete: false
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("changes progress to a random percentage", () => {
      const res = renderInstance.changeProgress();
      
      expect(res).toBe(true);
    });

    it("changes progress to 100%", () => {
      const res = renderInstance.completeProgress();
      
      expect(res).toBe(true);
    });

    it("changes the indeterminate progressbars state to complete", () => {
      const res = renderInstance.completeIndeterminate();
      
      expect(res).toBe(true);
    });
  });
});
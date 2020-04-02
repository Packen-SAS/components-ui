import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Radars from "../../app/views/Radars";

describe("<Radars/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(<Radars/>);
    renderInstance = render.instance();

    renderInstance.setState({
      isWaitAnimating: false
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("toggles the animation", () => {
      renderInstance.toggleAnimation();
      
      expect(renderInstance.state.isWaitAnimating).toBe(true);
    })
  });
});
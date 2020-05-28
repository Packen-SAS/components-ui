import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Cameras from "../../app/views/Cameras";

describe("<Cameras/>", () => {
  const render = shallow(<Cameras/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("opens a camera", () => {
      render.instance().open("regular");
      expect(render.instance().state.regular).toBe(true);
    });

    it("closes a camera", () => {
      render.instance().close("regular");
      expect(render.instance().state.regular).toBe(false);
    });

    it("triggers all callbacks from the rendered JSX", () => {
      const instance = render.instance();
      const spyOpen = jest.spyOn(instance, "open");
      const spyClose = jest.spyOn(instance, "close");
      
      render.props().children[0].props.children.props.children.forEach(child => {
        child.props.children.props.callback();
        expect(spyOpen).toHaveBeenCalled();
      });
      render.props().children[1].props.children.forEach(child => {
        child.props.dismiss();
        expect(spyClose).toHaveBeenCalled();
      });
      spyOpen.mockRestore();
      spyClose.mockRestore();
    });
  });
});
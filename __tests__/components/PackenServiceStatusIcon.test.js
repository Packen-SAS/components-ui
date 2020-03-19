import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenServiceStatusIcon from "../../app/components/PackenServiceStatusIcon";

describe("<PackenServiceStatusIcon/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenServiceStatusIcon
        key={0}
        stepsLength={3}
        activeIcon="search"
        activeIndex={0}
        selfIndex={0}
        isComplete={false} />
    );
    renderInstance = render.instance();
    
    renderInstance.setState({
      state: "default",
      isCurrent: false
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("sets 'state' as 'active' if prop indexes match", () => {
      render.setProps({
        activeIndex: 0,
        selfIndex: 0
      });
      renderInstance.checkIfCurrent();

      expect(renderInstance.state.state).toBe("active");

      /* Review to avoid using setTimeout */
      /* const timeout = setTimeout(() => {
        expect(renderInstance.state.state).toBe("active");
        clearTimeout(timeout);
      }, 2000); */
    });

    it("sets 'state' as 'default' if prop indexes don't match", () => {
      render.setProps({
        activeIndex: 0,
        selfIndex: 1
      });
      renderInstance.checkIfCurrent();

      expect(renderInstance.state.state).toBe("default");

      /* Review to avoid using setTimeout */
      /* const timeout = setTimeout(() => {
        expect(renderInstance.state.state).toBe("default");
        clearTimeout(timeout);
      }, 1000); */
    });
  });

  describe("triggering action", () => {
    it("executes correct code on componentDidMount", () => {
      const spyCheckIfActive = jest.spyOn(renderInstance, "checkIfActive");
      renderInstance.componentDidMount();
      
      expect(spyCheckIfActive).toHaveBeenCalled();
      spyCheckIfActive.mockRestore();
    });

    it("executes correct code on componentDidUpdate", () => {
      const spyCheckIfActive = jest.spyOn(renderInstance, "checkIfActive");
      const prevProps = { activeIndex: 0 };
      render.setProps({ activeIndex: 1 });
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyCheckIfActive).toHaveBeenCalled();
      spyCheckIfActive.mockRestore();
    });
  });
});
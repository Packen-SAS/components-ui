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

    it("render a divider if it's not the last step", () => {
      render.setProps({
        selfIndex: 0,
        stepsLength: 3
      });
      const returnedElement = renderInstance.getDivider();

      expect(returnedElement).toBeDefined();
    });

    it("returns a null element if it's the last step", () => {
      render.setProps({
        selfIndex: 2,
        stepsLength: 3
      });
      const returnedElement = renderInstance.getDivider();

      expect(returnedElement).toBe(null);
    });
  });

  describe("styling", () => {
    it("returns the correct icon name if it's the current step", () => {
      renderInstance.setState({ isCurrent: true });
      render.setProps({ activeIcon: "search" });
      const returnedIconName = renderInstance.getIcon();
      
      expect(returnedIconName).toBe("search");
    });

    it("returns the correct icon name if it's not the current step and is not complete", () => {
      renderInstance.setState({ isCurrent: false });
      render.setProps({ isComplete: false });
      const returnedIconName = renderInstance.getIcon();
      
      expect(returnedIconName).toBe("minus-circle");
    });

    it("returns the correct icon name if it's not the current step and is complete", () => {
      renderInstance.setState({ isCurrent: false });
      render.setProps({ isComplete: true });
      const returnedIconName = renderInstance.getIcon();
      
      expect(returnedIconName).toBe("check-circle");
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
    });

    it("sets 'state' as 'default' if prop indexes don't match", () => {
      render.setProps({
        activeIndex: 0,
        selfIndex: 1
      });
      renderInstance.checkIfCurrent();

      expect(renderInstance.state.state).toBe("default");
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
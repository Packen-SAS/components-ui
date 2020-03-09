import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenServiceStatusIcon from "../../app/components/PackenServiceStatusIcon";

describe("<PackenServiceStatusIcon/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = renderer.create(
      <PackenServiceStatusIcon
        key={0}
        stepsLength={3}
        activeIcon="search"
        activeIndex={0}
        selfIndex={0}
        isComplete={false} />
    );

    renderInstance = render.getInstance();
    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      }
    };
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
      renderInstance.props = { activeIndex: 0, selfIndex: 0 };
      renderInstance.check_if_current();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.state).toBe("active");
        clearTimeout(timeout);
      }, 1000);
    });

    it("sets 'state' as 'default' if prop indexes don't match", () => {
      renderInstance.props = { activeIndex: 0, selfIndex: 1 };
      renderInstance.check_if_current();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.state).toBe("default");
        clearTimeout(timeout);
      }, 1000);
    });
  });

  describe("triggering action", () => {
    it("executes correct code on componentDidMount", () => {
      renderInstance.check_if_active = jest.fn();
      renderInstance.componentDidMount();
      expect(renderInstance.check_if_active).toHaveBeenCalled();
    });
  });
});
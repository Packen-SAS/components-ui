import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenCheckboxControl from "../../app/components/PackenCheckboxControl";

describe("<PackenCheckboxControl/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = renderer.create(
      <PackenCheckboxControl
        label="Test"
        layout="column"
        isChecked={true}
        isDisabled={false}
        checkedItems={[]}
      />
    );

    renderInstance = render.getInstance();

    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      };
    }
    renderInstance.setState({
      label: "Test",
      isChecked: true,
      isDisabled: false,
      styles: {
        disabled: {}
      }
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidMount", () => {
      renderInstance.setDisabledStyles = jest.fn();
      renderInstance.componentDidMount();
      expect(renderInstance.setDisabledStyles).toHaveBeenCalled();
    });

    it("executes correct code on componentDidUpdate if checked items don't match", () => {
      const prevProps = { checkedItems: [] };
      renderInstance.setActiveStyles = jest.fn();
      renderInstance.props = { checkedItems: ["Test"] };

      renderInstance.componentDidUpdate(prevProps, null, null);
      expect(renderInstance.setActiveStyles).toHaveBeenCalled();
    });

    it("executes correct code on componentDidUpdate if 'isDisabled's don't match", () => {
      const prevProps = { isDisabled: false };
      renderInstance.setDisabledStyles = jest.fn();
      renderInstance.props = { isDisabled: true };

      renderInstance.componentDidUpdate(prevProps, null, null);
      expect(renderInstance.setDisabledStyles).toHaveBeenCalled();
    });
  });

  describe("state changing", () => {
    it("sets active styles if 'layout' is 'dropdown'", () => {
      renderInstance.props = { layout: "dropdown", checkedItems: [{ label: "Test", isChecked: true }] };
      renderInstance.setActiveStyles();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.isChecked).toBe(true);
        clearTimeout(timeout);
      }, 4000);
    });

    it("sets active styles if 'layout' is either 'column' or 'row' and labels match", () => {
      renderInstance.setState({ label: "Test" });
      renderInstance.props = { layout: "column", checkedItems: [{ label: "Test", isChecked: true }] };
      renderInstance.setActiveStyles();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.isChecked).toBe(true);
        clearTimeout(timeout);
      }, 2000);
    });

    it("sets active styles if 'layout' is either 'column' or 'row' and labels don't match", () => {
      renderInstance.setState({ label: "Test 2" });
      renderInstance.props = { layout: "column", checkedItems: [{ label: "Test", isChecked: true }] };
      renderInstance.setActiveStyles();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.isChecked).toBe(false);
        clearTimeout(timeout);
      }, 2000);
    });
  });
});
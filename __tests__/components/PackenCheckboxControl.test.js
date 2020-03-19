import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenCheckboxControl from "../../app/components/PackenCheckboxControl";

describe("<PackenCheckboxControl/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenCheckboxControl
        label="Test"
        layout="column"
        isChecked={true}
        isDisabled={false}
        checkedItems={[]}
      />
    );

    renderInstance = render.instance();

    render.setState({
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
      const spySetActiveStyles = jest.spyOn(renderInstance, "setActiveStyles");
      const prevProps = { checkedItems: [] };
      render.setProps({
        checkedItems: ["Test"]
      });
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spySetActiveStyles).toHaveBeenCalled();
      spySetActiveStyles.mockRestore();
    });

    it("executes correct code on componentDidUpdate if 'isDisabled's don't match", () => {
      const spySetDisabledStyles = jest.spyOn(renderInstance, "setDisabledStyles");
      const prevProps = { isDisabled: false };
      renderInstance.props = { isDisabled: true };
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spySetDisabledStyles).toHaveBeenCalled();
      spySetDisabledStyles.mockRestore();
    });
  });

  describe("state changing", () => {
    it("sets active styles if 'layout' is 'dropdown'", () => {
      render.setProps({
        layout: "dropdown",
        checkedItems: [{ label: "Test", isChecked: true }]
      });
      const res = renderInstance.setActiveStyles();

      expect(res).toBe(true);
    });

    it("sets active styles if 'layout' is either 'column' or 'row' and labels match", () => {
      render.setProps({
        layout: "column",
        checkedItems: ["Test"]
      });
      const res = renderInstance.setActiveStyles();

      expect(res).toBe(true);
    });

    it("sets active styles if 'layout' is either 'column' or 'row' and labels don't match", () => {
      render.setProps({
        layout: "row",
        checkedItems: ["Test 2"]
      });
      const res = renderInstance.setActiveStyles();

      expect(res).toBe(false);
    });
  });
});
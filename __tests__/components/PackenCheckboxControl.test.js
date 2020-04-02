import "react-native";
import React from "react";
import { shallow } from "enzyme";

import CheckboxStyles from "../../app/styles/components/PackenCheckbox";

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

  describe("styling", () => {
    it("sets disabled styles of label", () => {
      render.setProps({
        isDisabled: true
      });

      expect(render.props().children[1].props.style).toEqual({
        ...CheckboxStyles.label.base,
        ...CheckboxStyles.label.state.disabled
      });
    });

    it("sets default styles of label", () => {
      render.setProps({
        isDisabled: false
      });

      expect(render.props().children[1].props.style).toEqual({
        ...CheckboxStyles.label.base,
        ...CheckboxStyles.label.state.default
      });
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidMount", () => {
      const spySetDisabledStyles = jest.spyOn(renderInstance, "setDisabledStyles");
      renderInstance.componentDidMount();

      expect(spySetDisabledStyles).toHaveBeenCalled();
      spySetDisabledStyles.mockRestore();
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

    it("sets and returns disabled styles if it's checked and set so via props", () => {
      renderInstance.state.isDisabled = true;
      renderInstance.state.isChecked = true;
      const returnedStyles = renderInstance.setDisabledStyles();

      expect(renderInstance.state.styles).toEqual({
        ...renderInstance.state.styles,
        disabled: {
          ...CheckboxStyles.iconBox.state.disabled.active
        }
      });
      expect(returnedStyles).toEqual(CheckboxStyles.iconBox.state.disabled.active);
    });

    it("sets and returns disabled styles if it's unchecked and set so via props", () => {
      renderInstance.state.isDisabled = true;
      renderInstance.state.isChecked = false;
      const returnedStyles = renderInstance.setDisabledStyles();

      expect(renderInstance.state.styles).toEqual({
        ...renderInstance.state.styles,
        disabled: {
          ...CheckboxStyles.iconBox.state.disabled.inactive
        }
      });
      expect(returnedStyles).toEqual(CheckboxStyles.iconBox.state.disabled.inactive);
    });

    it("sets and returns an empty disabled styles object if it's not disabled", () => {
      renderInstance.state.isDisabled = false;
      const returnedStyles = renderInstance.setDisabledStyles();

      expect(renderInstance.state.styles).toEqual({
        ...renderInstance.state.styles,
        disabled: {
          ...renderInstance.state.styles.disabled
        }
      });
      expect(returnedStyles).toEqual({});
    });
  });
});
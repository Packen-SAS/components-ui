import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiRadioControl from "../../app/components/PackenUiRadioControl";

describe("<PackenUiRadioControl/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenUiRadioControl
        checkedIndex={0}
        selfIndex={1}
        label="Test"
        isDisabled={false}
        updateCheckedIndex={mockCallback} />
    );
    renderInstance = render.instance();
    
    renderInstance.setState({
      state: "default"
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders a label if provided via props", () => {
      render.setProps({
        label: "Test"
      });
      const res = renderInstance.getLabel();

      expect(res).toBeDefined();
    });

    it("does not render a label if not provided via props", () => {
      render.setProps({
        label: undefined
      });
      const res = renderInstance.getLabel();

      expect(res).toBe(null);
    });
  });

  describe("state changing", () => {
    it("sets initial state to 'default' if it's not disabled", () => {
      render.setProps({ isDisabled: false });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toBe("default");
    });

    it("sets initial state to 'default_disabled' if it's disabled", () => {
      render.setProps({ isDisabled: true });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toBe("default_disabled");
    });

    it("sets state as 'default_disabled'", () => {
      render.setProps({
        isDisabled: true,
        checkedIndex: 0,
        selfIndex: 1
      });
      renderInstance.checkIfDisabled();
      
      expect(renderInstance.state.state).toBe("default_disabled");
    });

    it("sets state as 'checked_disabled'", () => {
      render.setProps({
        isDisabled: true,
        checkedIndex: 0,
        selfIndex: 0
      });
      renderInstance.checkIfDisabled();
      
      expect(renderInstance.state.state).toBe("checked_disabled");
    });

    it("returns 'false' if it's not disabled", () => {
      render.setProps({
        isDisabled: false
      });
      const newState = renderInstance.checkIfDisabled();
      
      expect(newState).toBe(false);
    });

    it("sets state as 'default'", () => {
      render.setProps({
        checkedIndex: 0,
        selfIndex: 1
      });
      renderInstance.checkIfChecked();
      
      expect(renderInstance.state.state).toBe("default");
    });

    it("sets state as 'checked'", () => {
      render.setProps({
        checkedIndex: 0,
        selfIndex: 0
      });
      renderInstance.checkIfChecked();
      
      expect(renderInstance.state.state).toBe("checked");
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        updateCheckedIndex: undefined,
        selfIndex: undefined,
        isDisabled: undefined,
        checkedIndex: undefined,
        label: undefined,
        styling: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        updateCheckedIndex: false,
        selfIndex: 0,
        isDisabled: false,
        checkedIndex: -1,
        label: "",
        styling: { shape: {}, control: {}, label: {} }
      });
    });
  });

  describe("triggering actions", () => {
    it("triggers actions on componentDidMount", () => {
      const spyCheckIfChecked = jest.spyOn(renderInstance, "checkIfChecked");
      const spyCheckIfDisabled = jest.spyOn(renderInstance, "checkIfDisabled");
      renderInstance.componentDidMount();
      
      expect(spyCheckIfChecked).toHaveBeenCalled();
      expect(spyCheckIfDisabled).toHaveBeenCalled();
      spyCheckIfChecked.mockRestore();
      spyCheckIfDisabled.mockRestore();
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
    });

    it("sets checked state onPress", () => {
      render.setProps({
        selfIndex: 0,
        updateCheckedIndex: mockCallback
      });
      renderInstance.onPressHandler();
      
      expect(renderInstance.state.state).toBe("checked");
      expect(renderInstance.state.updateCheckedIndex).toHaveBeenCalled();
    });

    it("returns false after setting the checked state onPress if no update callback is provided", () => {
      renderInstance.setState({ updateCheckedIndex: false });
      const res = renderInstance.onPressHandler();
      
      expect(res).toBe(false);
    });

    it("triggers actions on componentDidUpdate if checkedIndex changed", () => {
      const spyCheckIfChecked = jest.spyOn(renderInstance, "checkIfChecked");
      const spyCheckIfDisabled = jest.spyOn(renderInstance, "checkIfDisabled");
      const prevProps = { checkedIndex: 0 };
      render.setProps({
        checkedIndex: 1
      });
      renderInstance.componentDidUpdate(prevProps, null, null);
      
      expect(spyCheckIfChecked).toHaveBeenCalled();
      expect(spyCheckIfDisabled).toHaveBeenCalled();
      spyCheckIfChecked.mockRestore();
      spyCheckIfDisabled.mockRestore();
    });
  });
});
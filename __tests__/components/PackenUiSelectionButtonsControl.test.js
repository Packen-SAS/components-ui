import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiSelectionButtonsControl from "../../app/components/PackenUiSelectionButtonsControl";

describe("<PackenUiSelectionButtonsControl/>", () => {
  let render, renderInstance;
  const items = [
    { label: "A1", value: "A1", isSelected: false },
    { label: "A2", value: "A2", isSelected: false },
    { label: "B1", value: "B1", isSelected: false },
    { label: "B2", value: "B2", isSelected: false },
    { label: "B3", value: "B3", isSelected: false },
    { label: "C1", value: "C1", isSelected: true },
    { label: "C2", value: "C2", isSelected: false },
    { label: "C3", value: "C3", isSelected: false }
  ];
  
  beforeAll(() => {
    render = shallow(
      <PackenUiSelectionButtonsControl
        data={{...items[0]}}
        type="label"
        selected="C1"
        selection="single"
        onNewSelection={jest.fn()}
      />
    );
    renderInstance = render.instance();

    renderInstance.setState({
      name: "selectionButtons1",
      type: "label",
      items: [...items],
      selection: "single",
      itemsPerRow: 4,
      selected: ""
    });
  });

  describe("triggering actions", () => {
    it("returns the correct initial config if the type is 'label'", () => {
      const returnedConfig = renderInstance.getConfig();

      expect(returnedConfig).toEqual({ label: { preset: "s2" } });
    });

    it("returns the correct initial config if the type is 'image'", () => {
      const img = {
        src: require("../../assets/images/i-propietario.png"),
        width: 50,
        height: 45
      };
      render.setProps({
        type: "image",
        data: {
          image: {...img}
        }
      });
      const returnedConfig = renderInstance.getConfig();

      expect(returnedConfig).toEqual({ image: {...img} });
    });

    it("triggers the new selection callback", () => {
      render.setProps({ onNewSelection: jest.fn() });
      renderInstance.newSelection();

      expect(renderInstance.props.onNewSelection).toHaveBeenCalled();
    });

    it("triggers the correct code on componentDidUpdate", () => {
      const prevProps = { selected: false };
      render.setProps({ selected: true });
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("updates the current state with newly received props", () => {
      const prevProps = { selected: false };
      render.setProps({ selected: true });
      const spyCheckIfActive = jest.spyOn(renderInstance, "checkIfActive");
      renderInstance.updateState(prevProps);

      expect(spyCheckIfActive).toHaveBeenCalled();
      spyCheckIfActive.mockRestore();
    });

    it("returns the correct initial inner state if selection is 'single' and values match", () => {
      render.setProps({ selection: "single", selected: "Test", data: { value: "Test" } });
      const returnedState = renderInstance.getInitialState();

      expect(returnedState).toBe("active");
    });

    it("returns the correct initial inner state if selection is 'single' and values don't match", () => {
      render.setProps({ selection: "single", selected: "Test", data: { value: "Test 2" } });
      const returnedState = renderInstance.getInitialState();

      expect(returnedState).toBe("default");
    });

    it("returns the correct initial inner state if selection is 'multiple' and values match", () => {
      render.setProps({ selection: "multiple", selected: ["Test"], data: { value: "Test" } });
      const returnedState = renderInstance.getInitialState();

      expect(returnedState).toBe("active");
    });

    it("returns the correct initial inner state if selection is 'multiple' and values don't match", () => {
      render.setProps({ selection: "multiple", selected: ["Test"], data: { value: "Test 2" } });
      const returnedState = renderInstance.getInitialState();

      expect(returnedState).toBe("default");
    });

    it("returns the new inner state while checking if it's active, type is 'label', selection is 'single' and values match", () => {
      render.setProps({ selected: "Test" });
      renderInstance.setState({ type: "label", data: { value: "Test" } });
      const returnedState = renderInstance.checkIfActive();

      expect(returnedState.state).toBe("active");
      expect(returnedState.config.label.preset).toBe("s1");
    });

    it("returns the new inner state while checking if it's active, type is 'label, selection is 'single' and values don't match", () => {
      render.setProps({ selected: "Test" });
      renderInstance.setState({ type: "label", data: { value: "Test 2" } });
      const returnedState = renderInstance.checkIfActive();

      expect(returnedState.state).toBe("default");
      expect(returnedState.config.label.preset).toBe("s2");
    });

    it("returns the new inner state while checking if it's active, type is 'image', selection is 'multiple' and values match", () => {
      render.setProps({ selected: ["Test"] });
      renderInstance.setState({
        type: "image",
        selection: "multiple",
        data: { value: "Test" },
        config: {
          image: {
            src: require("../../assets/images/i-propietario.png"),
            width: 50,
            height: 45
          }
        }
      });
      const returnedState = renderInstance.checkIfActive();

      expect(returnedState.state).toBe("active");
    });

    it("returns the new inner state while checking if it's active, type is 'image, selection is 'multiple' and values don't match", () => {
      render.setProps({ selected: ["Test"] });
      renderInstance.setState({
        type: "image",
        selection: "multiple",
        data: { value: "Test 2" },
        config: {
          image: {
            src: require("../../assets/images/i-propietario.png"),
            width: 50,
            height: 45
          }
        }
      });
      const returnedState = renderInstance.checkIfActive();

      expect(returnedState.state).toBe("default");
    });
  });

  describe("styling", () => {
    it("returns a styles object", () => {
      const returnedStyles = renderInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders null as the image if the type is not 'image'", () => {
      renderInstance.setState({ type: "label" });
      const returnedElement = renderInstance.getImage();

      expect(returnedElement).toBe(null);
    });

    it("renders the image if provided and type is 'image'", () => {
      renderInstance.setState({
        type: "image",
        config: {
          image: {
            src: require("../../assets/images/i-propietario.png"),
            width: 50,
            height: 45
          }
        }
      });
      const returnedElement = renderInstance.getImage();

      expect(returnedElement).toBeDefined();
    });
  });
});
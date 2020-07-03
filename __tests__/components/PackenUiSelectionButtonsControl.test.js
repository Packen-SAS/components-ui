import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiSelectionButtonsControl from "../../app/components/PackenUiSelectionButtonsControl";

describe("<PackenUiSelectionButtonsControl/>", () => {
  let render, renderImage, renderInstance, renderImageInstance;
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
  const itemsImgs = [
    {
      image: {
        default: {
          src: require("../../assets/images/i-propietario-default.png"),
          width: 26,
          height: 45
        },
        active: {
          src: require("../../assets/images/i-propietario.png"),
          width: 51,
          height: 45
        }
      },
      label: "SÍ",
      value: true,
      isSelected: true
    },
    {
      image: {
        default: {
          src: require("../../assets/images/i-propietario-default.png"),
          width: 26,
          height: 45
        },
        active: {
          src: require("../../assets/images/i-propietario.png"),
          width: 51,
          height: 45
        }
      },
      label: "NO",
      value: false,
      isSelected: false
    }
  ];

  beforeAll(() => {
    render = shallow(
      <PackenUiSelectionButtonsControl
        data={{ ...items[0] }}
        type="label"
        selected="C1"
        selection="single"
        onNewSelection={jest.fn()}
      />
    );
    renderInstance = render.instance();

    renderImage = shallow(
      <PackenUiSelectionButtonsControl
        data={{ ...itemsImgs[0] }}
        type="image"
        selected={{ ...itemsImgs[0] }}
        selection="single"
        onNewSelection={jest.fn()}
      />
    );
    renderImageInstance = renderImage.instance();

    renderInstance.setState({
      data: { ...items[0] },
      onNewSelection: jest.fn(),
      type: "label",
      items: [...items],
      selection: "single",
      itemsPerRow: 4,
      selected: "C1",
      state: "default",
      config: { label: { preset: "s2" } }
    });
  });

  describe("triggering actions", () => {
    it("returns the correct initial config if the type is 'label'", () => {
      const returnedConfig = renderInstance.getConfig();

      expect(returnedConfig).toEqual({ label: { preset: "s2" } });
    });

    it("returns the correct initial config if the type is 'label' and altStyle is defined", () => {
      render.setProps({ altStyle: true });
      renderInstance.setState({ altStyle: true });
      const returnedConfig = renderInstance.getConfig();

      expect(returnedConfig).toEqual({ label: { preset: "h6" } });
    });

    it("returns the correct initial config if the type is 'image'", () => {
      renderImageInstance.setState({ type: "image" });
      const returnedConfig = renderImageInstance.getConfig();

      expect(returnedConfig).toEqual({ image: { ...itemsImgs[0].image } });
    });

    it("triggers the new selection callback", () => {
      renderInstance.setState({ onNewSelection: jest.fn() });
      renderInstance.newSelection();

      expect(renderInstance.state.onNewSelection).toHaveBeenCalled();
    });

    it("returns false while triggering the new selection callback if it's not provided", () => {
      renderInstance.setState({ onNewSelection: false });
      const res = renderInstance.newSelection();

      expect(res).toBe(false);
    });

    it("triggers the correct code on componentDidUpdate", () => {
      const prevProps = { selected: false };
      render.setProps({ selected: true });
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
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
      renderInstance.setState({ selection: "single", selected: "Test", type: "label", data: { value: "Test" } });
      const returnedState = renderInstance.checkIfActive();

      expect(returnedState.state).toBe("active");
      expect(returnedState.config.label.preset).toBe("s1");
    });

    it("returns the new inner state while checking if it's active, type is 'label, selection is 'single' and values don't match", () => {
      render.setProps({ type: "label", selected: "Test" });
      renderInstance.setState({ type: "label", selected: "Test", data: { value: "Test 2" } });
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
          image: { ...itemsImgs[0].image }
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
          image: { ...itemsImgs[0].image }
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
          image: { ...itemsImgs[0].image }
        }
      });
      const returnedElement = renderInstance.getImage();

      expect(returnedElement).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        type: undefined,
        data: undefined,
        selected: undefined,
        selection: undefined,
        onNewSelection: undefined,
        altStyle: undefined,
        styling: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        type: "label",
        data: {
          value: "",
          label: "",
          image: {
            src: "",
            width: 0,
            height: 0
          }
        },
        selected: [],
        selection: "single",
        onNewSelection: false,
        altStyle: false,
        styling: { box: {}, image: {}, label: {} }
      });
    });

    it("returns incoming props as the state key-value pairs if selected is 'false'", () => {
      render.setProps({ selected: false });
      const res = renderInstance.setPropsToState();
  
      expect(res.selected).toBe(false);
    });

    it("returns incoming props as the state key-value pairs if styling is provided", () => {
      render.setProps({ styling: { test: "Test" } });
      const res = renderInstance.setPropsToState();
      expect(res.styling).toEqual({ test: "Test" });
    });
  });
});
import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import PackenUiText from "../../app/components/PackenUiText";
import PackenUiDropdown from "../../app/components/PackenUiDropdown";

import { genKey } from "../../app/utils";

describe("<PackenUiDropdown/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();
  const list = {
    config: {
      size: "medium",
      checkedIcon: "check",
      selectionType: "single"
    },
    items: [
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Bogotá, D.C.",
        isSelected: false,
        main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Medellín",
        isSelected: false,
        main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Bucaramanga",
        isSelected: false,
        isDisabled: true,
        main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Santa Marta",
        isSelected: false,
        main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Cali",
        isSelected: false,
        main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Cartagena",
        isSelected: false,
        main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Leticia",
        isSelected: false,
        main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>)
      }
    ]
  };

  beforeAll(() => {
    render = shallow(
      <PackenUiDropdown
        size="medium"
        list={list}
        input={{
          label: "Single selection",
          placeholder: "Selecciona tu ciudad",
          onChangeText: () => { return; },
          icon: {
            name: "chevron-down",
            position: "right",
            style: { color: Colors.brand.primary.drk }
          },
          theme: "default",
          nonEditable: true,
          help: "Help text"
        }}
        name="dropdown1"
        callback={mockCallback}
      />
    );

    renderInstance = render.instance();

    renderInstance.setState({
      callback: mockCallback,
      name: "dropdown1",
      isDisabled: false,
      input: {
        label: "Single selection",
        placeholder: "Selecciona tu ciudad",
        onChangeText: () => { return; },
        icon: {
          name: "chevron-down",
          position: "right",
          style: { color: Colors.brand.primary.drk }
        },
        theme: "default",
        nonEditable: true,
        help: "Help text"
      },
      list: {...list},
      size: "medium",
      contentSizerHeight: 0,
      isOpen: false,
      dimensions: {
        menu: {
          height: 0
        }
      },
      styles: {
        menu: {}
      },
      finalSelection: [],
      finalSelectionString: ""
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("disables pointer events if set so via props", () => {
      render.setProps({
        isDisabled: true
      });

      expect(render.props().pointerEvents).toBe("none");
    });

    it("enables pointer events if it's not disabled", () => {
      render.setProps({
        isDisabled: false
      });
      
      expect(render.props().pointerEvents).toBe("auto");
    });
  });

  describe("styling", () => {
    it("returns the custom styles if the content sizer's height is not zero", () => {
      renderInstance.setState({ contentSizerHeight: 10 });
      const returnedStyles = renderInstance.getCustomStyle();

      expect(returnedStyles).toEqual({ height: 10 });
    });

    it("returns an empty object as the custom styles if the content sizer's height is zero", () => {
      renderInstance.setState({ contentSizerHeight: 0 });
      const returnedStyles = renderInstance.getCustomStyle();

      expect(returnedStyles).toEqual({});
    });
  });

  describe("state changing", () => {
    it("sets menu height", () => {
      renderInstance.getMenuDimensions({ height: 100 });

      expect(renderInstance.state.dimensions.menu.height).toBe(100);
    });

    it("sets custom styles to position the menu", () => {
      renderInstance.setState({ dimensions: { menu: { height: 100 } } });
      renderInstance.setCustomStyles();

      expect(renderInstance.state.styles.menu).toEqual({ bottom: -108 });
    });

    it("toggles 'isOpen' state", () => {
      renderInstance.setState({ isOpen: false });
      renderInstance.toggleMenu();

      expect(renderInstance.state.isOpen).toBe(true);
    });

    it("sets selected items", () => {
      const items = ["Test", "Test 2"];
      render.setProps({ name: "dropdown1" });
      renderInstance.setState({ finalSelection: ["Test", "Test 2"] });
      renderInstance.getFinalSelection(items);

      expect(renderInstance.state.finalSelection).toEqual(items);
      expect(renderInstance.props.callback).toHaveBeenCalledWith("dropdown1", items);
    });

    it("composes selected items as a single string", () => {
      renderInstance.setState({ finalSelection: ["Test", "Test 2"] });
      renderInstance.composeFinalSelectionString();

      expect(renderInstance.state.finalSelectionString).toBe("Test, Test 2");
    });

    it("correctly sets the content sizer's height when it's less than the component's size", () => {
      renderInstance.setState({ size: "medium" });
      renderInstance.getContentSizerDimensions({ nativeEvent: { layout: { height: 10 } } });

      expect(renderInstance.state.contentSizerHeight).toBe(48);
    });

    it("correctly sets the content sizer's height when it's greater than the component's size", () => {
      renderInstance.setState({ size: "medium" });
      renderInstance.getContentSizerDimensions({ nativeEvent: { layout: { height: 60 } } });

      expect(renderInstance.state.contentSizerHeight).toBe(60);
    });
  });

  describe("triggering actions", () => {
    it("executes onLayout code for menu", () => {
      renderInstance.getMenuDimensions = jest.fn();
      render.props().children[1].props.onLayout({
        nativeEvent: {
          layout: {
            width: 10,
            height: 10
          }
        }
      });

      expect(renderInstance.getMenuDimensions).toHaveBeenCalledWith({ width: 10, height: 10 });
    });
  });
});
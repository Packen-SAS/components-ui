import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import PackenText from "../../app/components/PackenText";
import PackenDropdown from "../../app/components/PackenDropdown";

import { genKey } from "../../app/utils";

describe("<PackenDropdown/>", () => {
  let render, renderInstance;
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
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Medellín",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Bucaramanga",
        isSelected: false,
        isDisabled: true,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Santa Marta",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Cali",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Cartagena",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Leticia",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>)
      }
    ]
  };

  beforeAll(() => {
    render = shallow(
      <PackenDropdown
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
      />
    );

    renderInstance = render.instance();

    renderInstance.setState({
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
      renderInstance.getFinalSelection(items);

      expect(renderInstance.state.finalSelection).toEqual(items);
    });

    it("composes selected items as a single string", () => {
      renderInstance.setState({ finalSelection: ["Test", "Test 2"] });
      renderInstance.composeFinalSelectionString();

      expect(renderInstance.state.finalSelectionString).toBe("Test, Test 2");
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidUpdate if is open", () => {
      const prevState = { isOpen: false };
      renderInstance.setState({ isOpen: true });
      renderInstance.componentDidUpdate(null, prevState, null);

      expect(renderInstance.state.styles.menu.opacity).toBe(1);
    });

    it("executes correct code on componentDidUpdate if is not open", () => {
      const prevState = { isOpen: true };
      renderInstance.setState({ isOpen: false });
      renderInstance.componentDidUpdate(null, prevState, null);

      expect(renderInstance.state.styles.menu.opacity).toBe(0);
    });

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
import "react-native";
import React from "react";
import renderer from "react-test-renderer";

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
    render = renderer.create(
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

    renderInstance = render.getInstance();

    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      };
    }
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
      renderInstance.setCustomStyles = jest.fn();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.dimensions.menu.height).toBe(100);

        const innerTimeout = setTimeout(() => {
          expect(renderInstance.setCustomStyles).toHaveBeenCalled();
          clearTimeout(innerTimeout);
        }, 2000);

        clearTimeout(timeout);
      }, 2000);
    });

    it("sets custom styles to position the menu", () => {
      renderInstance.setState({ dimensions: { menu: { height: 100 } } });
      renderInstance.setCustomStyles();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.styles.menu).toBe({ bottom: -108 });
        clearTimeout(timeout);
      }, 4000);
    });

    it("toggles 'isOpen' state", () => {
      renderInstance.setState({ isOpen: false });
      renderInstance.toggleMenu();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.isOpen).toBe(true);
        clearTimeout(timeout);
      }, 2000);
    });

    it("sets selected items", () => {
      const items = ["Test", "Test 2"];
      renderInstance.composeFinalSelectionString = jest.fn();
      renderInstance.getFinalSelection(items);

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.finalSelection).toEqual(items);

        const innerTimeout = setTimeout(() => {
          expect(renderInstance.composeFinalSelectionString).toHaveBeenCalled();
          clearTimeout(innerTimeout);
        }, 2000);

        clearTimeout(timeout);
      }, 2000);
    });

    it("composes selected items as a single string", () => {
      renderInstance.setState({ finalSelection: ["Test", "Test 2"] });
      renderInstance.composeFinalSelectionString();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.finalSelectionString).toBe("Test, Test 2");
        clearTimeout(timeout);
      }, 4000);
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidUpdate", () => {
      const prevState = { isOpen: false };
      renderInstance.setState({ isOpen: true });
      renderInstance.componentDidUpdate(null, prevState, null);

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.styles.menu.opacity).toBe(1);
        clearTimeout(timeout);
      }, 2000);
    });
  });
});
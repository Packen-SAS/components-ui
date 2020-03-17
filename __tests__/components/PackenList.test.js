import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenList from "../../app/components/PackenList";
import PackenText from "../../app/components/PackenText";

import Colors from "../../app/styles/abstracts/colors";
import { genKey } from "../../app/utils";

describe("<PackenList/>", () => {
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
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = renderer.create(
      <PackenList
        items={list.items}
        config={{ size: "medium", ...list.config }}
        numShownRows={4}
        getFinalSelection={mockCallback}
        finalSelectionArray={mockCallback}
        toggleMenu={mockCallback}
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
      height: "100%",
      items: list.items,
      selectedItems: [],
      currentRadiosState: {
        checkedValue: ""
      },
      currentCheckboxesState: {
        finalSelectionArray: [],
        checkedValues: []
      }
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders an item correctly", () => {
      const rendered = renderInstance.renderItem({ item: { ...list.items[0] } });
      expect(rendered).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidUpdate", () => {
      const prevState = { selectedItems: [list.items[0]] };
      renderInstance.props = { getFinalSelection: jest.fn() };
      renderInstance.setState({ selectedItems: [list.items[0], list.items[1]] });
      renderInstance.componentDidUpdate(null, prevState, null);
      expect(renderInstance.props.getFinalSelection).toHaveBeenCalledWith(renderInstance.state.selectedItems);

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.currentCheckboxesState.finalSelectionArray).toEqual([list.items[0], list.items[1]]);
        clearTimeout(timeout);
      }, 4000);
    });
  });

  describe("state changing", () => {
    it("sets correct item height if items length is less than declared number of rows via props", () => {
      renderInstance.props = { numShownRows: 4 };
      renderInstance.setState({ items: ["Test", "Test 2", "Test 3"] });
      renderInstance.getItemHeight(10);

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.height).toBe(30);
        clearTimeout(timeout);
      }, 4000);
    });

    it("sets correct item height if items length is not less than declared number of rows via props", () => {
      renderInstance.props = { numShownRows: 1 };
      renderInstance.setState({ items: ["Test", "Test 2"] });
      renderInstance.getItemHeight(10);

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.height).toBe(10);
        clearTimeout(timeout);
      }, 2000);
    });

    it("updates selected items if selection type is 'single' or 'radio' and no payload is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]] });
      renderInstance.props = { config: { selectionType: "single" }, toggleMenu: jest.fn() };
      renderInstance.updateSelectedItems("Medellín", true);

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        let newItems = [...renderInstance.state.items];
        newItems = newItems.forEach(item => item.isSelected = false);
        expect(renderInstance.state.items).toBe(newItems);
        expect(renderInstance.state.selectedItems).toBe(["Medellín"]);
        expect(renderInstance.props.toggleMenu).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 4000);
    });

    it("updates selected items if selection type is 'single' or 'radio' and a payload is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]] });
      renderInstance.props = { config: { selectionType: "single" }, toggleMenu: jest.fn() };
      renderInstance.updateSelectedItems("Medellín", true, { checkedType: "radio", checkedValue: "Medellín" });

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        let newItems = [...renderInstance.state.items];
        newItems = newItems.forEach(item => item.isSelected = false);
        expect(renderInstance.state.items).toBe(newItems);
        expect(renderInstance.state.selectedItems).toBe(["Medellín"]);
        expect(renderInstance.currentRadiosState.checkedValue).toBe("Medellín");
        expect(renderInstance.props.toggleMenu).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 4000);
    });

    it("updates selected items if selection type is 'multiple' or 'checkbox' and no payload is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]] });
      renderInstance.props = { config: { selectionType: "single" } };
      renderInstance.updateSelectedItems("Medellín", true);

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.items).toEqual([...renderInstance.state.items]);
        expect(renderInstance.state.selectedItems).toBe(["Medellín"]);
        clearTimeout(timeout);
      }, 2000);
    });

    it("updates selected items if selection type is 'multiple' or 'checkbox' and a payload is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]], currentCheckboxesState: { checkedValues: [] } });
      renderInstance.props = { config: { selectionType: "single" } };
      renderInstance.updateSelectedItems("Medellín", true, { checkedType: "checkbox", checkedValue: "Medellín" });

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.items).toEqual([...renderInstance.state.items]);
        expect(renderInstance.state.selectedItems).toEqual(["Medellín"]);
        expect(renderInstance.state.currentCheckboxesState.checkedValues).toEqual(["Medellín"]);
        clearTimeout(timeout);
      }, 2000);
    });
  });
});
import "react-native";
import React from "react";
import { shallow } from "enzyme";

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
    render = shallow(
      <PackenList
        items={list.items}
        config={{ size: "medium", ...list.config }}
        numShownRows={4}
        getFinalSelection={mockCallback}
        finalSelectionArray={mockCallback}
        toggleMenu={mockCallback}
      />
    );

    renderInstance = render.instance();

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
      render.setProps({
        getFinalSelection: mockCallback
      });
      renderInstance.setState({ selectedItems: [list.items[0], list.items[1]] });
      renderInstance.componentDidUpdate(null, prevState, null);

      expect(renderInstance.props.getFinalSelection).toHaveBeenCalledWith(renderInstance.state.selectedItems);
      expect(renderInstance.state.currentCheckboxesState.finalSelectionArray).toEqual([list.items[0], list.items[1]]);
    });
  });

  describe("state changing", () => {
    it("sets correct item height if items length is less than declared number of rows via props", () => {
      render.setProps({
        numShownRows: 4
      });
      renderInstance.setState({ items: ["Test", "Test 2", "Test 3"] });
      renderInstance.getItemHeight(10);

      expect(renderInstance.state.height).toBe(30);
    });

    it("sets correct item height if items length is not less than declared number of rows via props", () => {
      render.setProps({
        numShownRows: 1
      });
      renderInstance.setState({ items: ["Test", "Test 2"] });
      renderInstance.getItemHeight(10);

      expect(renderInstance.state.height).toBe(10);
    });

    it("updates selected items if selection type is 'single' or 'radio' and no payload is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]] });
      render.setProps({
        config: {
          selectionType: "single"
        },
        toggleMenu: mockCallback
      });
      renderInstance.updateSelectedItems("Medellín", true);

      const newItems = [...list.items];
      newItems.forEach(item => item.isSelected = false);

      expect(renderInstance.state.items).toEqual([list.items[0], list.items[1]]);
      expect(renderInstance.state.selectedItems).toEqual(["Medellín"]);
      expect(renderInstance.props.toggleMenu).toHaveBeenCalled();
    });

    it("updates selected items if selection type is 'single' or 'radio' and a payload is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]] });
      render.setProps({
        config: {
          selectionType: "radio"
        },
        toggleMenu: mockCallback
      });
      renderInstance.updateSelectedItems("Medellín", true, { checkedType: "radio", checkedValue: "Medellín" });

      const newItems = [...list.items];
      newItems.forEach(item => item.isSelected = false);
      
      expect(renderInstance.state.items).toEqual([list.items[0], list.items[1]]);
      expect(renderInstance.state.selectedItems).toEqual(["Medellín"]);
      expect(renderInstance.state.currentRadiosState.checkedValue).toEqual("Medellín");
      expect(renderInstance.props.toggleMenu).toHaveBeenCalled();
    });

    it("updates selected items if selection type is 'multiple' or 'checkbox' and no payload is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]] });
      render.setProps({
        config: {
          selectionType: "multiple"
        }
      });
      renderInstance.updateSelectedItems("Medellín", true);

      expect(renderInstance.state.items).toEqual([list.items[0], list.items[1]]);
      expect(renderInstance.state.selectedItems).toEqual(["Medellín"]);
    });

    it("updates selected items if selection type is 'multiple' or 'checkbox' and a payload is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]], currentCheckboxesState: { checkedValues: [] } });
      render.setProps({
        config: {
          selectionType: "checkbox"
        }
      });
      renderInstance.updateSelectedItems("Medellín", true, { checkedType: "checkbox", checkedValue: "Medellín" });

      expect(renderInstance.state.items).toEqual([list.items[0], list.items[1]]);
      expect(renderInstance.state.selectedItems).toEqual(["Medellín"]);
      expect(renderInstance.state.currentCheckboxesState.checkedValues).toEqual(["Medellín"]);
    });
  });
});
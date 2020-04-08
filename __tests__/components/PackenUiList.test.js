import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiList from "../../app/components/PackenUiList";
import PackenUiText from "../../app/components/PackenUiText";

import Colors from "../../app/styles/abstracts/colors";
import { genKey } from "../../app/utils";

describe("<PackenUiList/>", () => {
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
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenUiList
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

    it("returns false on componentDidUpdate if no 'getFinalSelection' is passed", () => {
      const prevState = { selectedItems: [list.items[0]] };
      render.setProps({
        getFinalSelection: undefined
      });
      const res = renderInstance.componentDidUpdate(null, prevState, null);

      expect(res).toBe(false);
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

    it("updates selected items if selection type is 'single' or 'radio' and a payload with 'checkedType' different to 'radio' is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]] });
      render.setProps({
        config: {
          selectionType: "radio"
        },
        toggleMenu: mockCallback
      });
      renderInstance.updateSelectedItems("Medellín", true, { checkedType: undefined, checkedValue: "Medellín" });

      expect(renderInstance.state.currentRadiosState).toEqual({
        checkedValue: "Medellín"
      });
    });

    it("updates selected items if selection type is 'single' or 'radio' and doesn't close the dropdown if no 'toggleMenu' is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]] });
      render.setProps({
        config: {
          selectionType: "radio"
        },
        toggleMenu: undefined
      });
      const res = renderInstance.updateSelectedItems("Medellín", true, { checkedType: undefined, checkedValue: "Medellín" });

      expect(renderInstance.state.currentRadiosState).toEqual({
        checkedValue: "Medellín"
      });
      expect(res).toBe(false);
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

    it("updates selected items if selection type is 'multiple' or 'checkbox' and a payload with 'checkedType' different to 'checkbox' is passed", () => {
      renderInstance.setState({ items: [list.items[0], list.items[1]], currentCheckboxesState: { checkedValues: [] } });
      renderInstance.state.checkedValues = ["Test"];
      render.setProps({
        config: {
          selectionType: "checkbox"
        }
      });
      renderInstance.updateSelectedItems("Medellín", true, { checkedType: undefined, checkedValue: "Medellín" });

      expect(renderInstance.state.currentCheckboxesState).toEqual({
        ...renderInstance.state.currentCheckboxesState,
        checkedValues: []
      });
    });

    it("returns false if selection type is not defined", () => {
      render.setProps({
        config: {
          selectionType: undefined
        }
      });
      const res = renderInstance.updateSelectedItems("Medellín", true, { checkedType: "checkbox", checkedValue: "Medellín" });

      expect(res).toBe(false);
    });
  });
});
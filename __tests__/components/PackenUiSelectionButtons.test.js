import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiSelectionButtons from "../../app/components/PackenUiSelectionButtons";

describe("<PackenUiSelectionButtons/>", () => {
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
      <PackenUiSelectionButtons
        type="label"
        selection="single"
        itemsPerRow={4}
        name="selectionButtons1"
        onNewSelection={jest.fn()}
        items={[...items]}
      />
    );
    renderInstance = render.instance();

    renderInstance.setState({
      name: "selectionButtons1",
      type: "label",
      items: [...items],
      selection: "single",
      itemsPerRow: 4,
      selected: "C1"
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("returns the initially selected element(s) if any and the selection is 'single'", () => {
      const returnedElement = renderInstance.getInitialSelected();
      
      expect(returnedElement).toBe("C1");
    });

    it("returns the initially selected element(s) if any and the selection is 'multiple'", () => {
      render.setProps({ selection: "multiple" });
      const returnedElement = renderInstance.getInitialSelected();
      
      expect(returnedElement).toEqual(["C1"]);
    });

    it("returns the default value for the selected element(s) if there's none and the selection is 'single'", () => {
      render.setProps({
        selection: "single",
        items: [items[0], items[1]]
      });
      const returnedElement = renderInstance.getInitialSelected();
      
      expect(returnedElement).toBe("");
    });

    it("returns the default value for the selected element(s) if there's none and the selection is 'multiple'", () => {
      render.setProps({
        selection: "multiple",
        items: [items[0], items[1]]
      });
      const returnedElement = renderInstance.getInitialSelected();
      
      expect(returnedElement).toEqual([]);
    });

    it("returns the newly-set selected item(s) if any and selection is 'single'", () => {
      renderInstance.setState({
        selection: "single"
      });
      const returnedElement = renderInstance.newSelectionHandler("Test");

      expect(returnedElement).toBe("Test");
      expect(renderInstance.props.onNewSelection).toHaveBeenCalled();
    });

    it("Adds to and returns the newly-set selected item(s) if any, selection is 'multiple' and selected items are more than 1", () => {
      renderInstance.setState({
        selection: "multiple",
        selected: [items[0].value, items[1].value]
      });
      const returnedElement = renderInstance.newSelectionHandler("Test");

      expect(returnedElement).toEqual([items[0].value, items[1].value, "Test"]);
      expect(renderInstance.props.onNewSelection).toHaveBeenCalled();
    });

    it("Removes from and returns the newly-set selected item(s) if any, selection is 'multiple' and selected items are more than 1", () => {
      renderInstance.setState({
        selection: "multiple",
        selected: [items[0].value, items[1].value]
      });
      const returnedElement = renderInstance.newSelectionHandler(items[0].value);

      expect(returnedElement).toEqual([items[1].value]);
      expect(renderInstance.props.onNewSelection).toHaveBeenCalled();
    });

    it("Returns the same newly-set selected item(s) if any, selection is 'multiple' and selected items are not more than 1", () => {
      renderInstance.setState({
        selection: "multiple",
        selected: [items[0].value]
      });
      const returnedElement = renderInstance.newSelectionHandler(items[0].value);

      expect(returnedElement).toEqual([items[0].value]);
      expect(renderInstance.props.onNewSelection).toHaveBeenCalled();
    });
  });

  describe("styling", () => {
    it("returns a styles object", () => {
      const returnedStyles = renderInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });
  });
});
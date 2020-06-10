import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiCheckbox from "../../app/components/PackenUiCheckbox";

describe("<PackenUiCheckbox/>", () => {
  const items = [
    {
      label: "This is checked",
      value: "This is checked",
      isChecked: true,
      isDisabled: false
    },
    {
      label: "This is unchecked",
      value: "This is unchecked",
      isChecked: false,
      isDisabled: false
    },
    {
      label: "This is both checked and disabled",
      value: "This is both checked and disabled",
      isChecked: true,
      isDisabled: true
    },
    {
      label: "This is both unchecked and disabled",
      value: "This is both unchecked and disabled",
      isChecked: false,
      isDisabled: true
    }
  ];

  const mockCallback = jest.fn();

  let renderColumn, renderRow, renderColumnInstance;

  beforeAll(() => {
    renderColumn = shallow(
      <PackenUiCheckbox
        layout="column"
        items={items}
        callback={mockCallback}
        name="checkbox1"
      />
    );
    renderRow = shallow(
      <PackenUiCheckbox
        layout="row"
        items={items}
        callback={mockCallback}
        name="checkbox2"
      />
    );

    renderColumnInstance = renderColumn.instance();

    renderColumnInstance.setState({
      items: items,
      checkedItems: [],
      selectedIndex: null
    });
  });

  describe("rendering", () => {
    it("renders column layout correctly", () => {
      expect(renderColumn).toBeDefined();
    });

    it("renders row layout correctly", () => {
      expect(renderRow).toBeDefined();
    });
  });

  describe("styling", () => {
    it("disables pointer events if it's part of a dropdown", () => {
      renderColumn.setProps({
        layout: "dropdown"
      });

      expect(renderColumn.props().pointerEvents).toBe("none");
    });

    it("enables pointer events if it's not part of a dropdown", () => {
      renderColumn.setProps({
        layout: "column"
      });

      expect(renderColumn.props().pointerEvents).toBe("auto");
    });
  });

  describe("state changing", () => {
    it("updates checked items if selectedIndex is defined", () => {
      renderColumnInstance.setState({ selectedIndex: 0 });
      renderColumnInstance.updateCheckedItems();

      expect(renderColumnInstance.state.checkedItems).toEqual(["This is both checked and disabled"]);
      expect(renderColumnInstance.props.callback).toHaveBeenCalled();
    });

    it("doesn't update checked items if selectedIndex is not defined", () => {
      renderColumnInstance.setState({ selectedIndex: null });
      const response = renderColumnInstance.updateCheckedItems();
      expect(response).toBe(false);
    });

    it("returns incoming props as the state key-value pairs", () => {
      renderColumn.setProps({
        layout: undefined,
        items: undefined,
        callback: undefined,
        name: undefined,
        styling: undefined
      });
      const res = renderColumnInstance.setPropsToState();

      expect(res).toEqual({
        layout: "column",
        items: [],
        callback: false,
        name: "",
        styling: { wrapper: {}, content: {}, control: {} }
      });
    });

    it("returns incoming props as the state key-value pairs if some are provided", () => {
      renderColumn.setProps({ styling: { test: "Test" } });
      const res = renderColumnInstance.setPropsToState();
      expect(res.styling).toEqual({ test: "Test" });
    });

    it("returns false after updating checked items if selectedIndex is defined but no callback is provided", () => {
      renderColumnInstance.setState({ callback: false });
      const res = renderColumnInstance.updateCheckedItems();

      expect(res).toBe(false);
    });
  });

  describe("triggering actions", () => {
    it("updates selected item index on press", () => {
      renderColumnInstance.setState({ items: [...items] });
      const spyUpdateCheckedItems = jest.spyOn(renderColumnInstance, "updateCheckedItems");
      renderColumnInstance.pressHandler(0);
      
      expect(renderColumnInstance.state.selectedIndex).toBe(0);
      expect(spyUpdateCheckedItems).toHaveBeenCalled();
      spyUpdateCheckedItems.mockRestore();
    });

    it("executes onPress code", () => {
      renderColumnInstance.pressHandler = jest.fn();
      renderColumn.props().children[0].props.children.props.onPress();
      
      expect(renderColumnInstance.pressHandler).toHaveBeenCalledWith(0);
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      renderColumn.setProps({ instance: jest.fn() });
      renderColumnInstance.componentDidMount();

      expect(renderColumnInstance.props.instance).toHaveBeenCalled();
    });
  });
});
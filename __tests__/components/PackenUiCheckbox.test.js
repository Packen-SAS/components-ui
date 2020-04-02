import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiCheckbox from "../../app/components/PackenUiCheckbox";

describe("<PackenUiCheckbox/>", () => {
  const items = [
    {
      label: "This is checked",
      isChecked: true,
      isDisabled: false
    },
    {
      label: "This is unchecked",
      isChecked: false,
      isDisabled: false
    },
    {
      label: "This is both checked and disabled",
      isChecked: true,
      isDisabled: true
    },
    {
      label: "This is both unchecked and disabled",
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
      />
    );
    renderRow = shallow(
      <PackenUiCheckbox
        layout="row"
        items={items}
        callback={mockCallback}
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

    it("sets checked state programmatically if searched value matches", () => {
      renderColumnInstance.setCheckedState("This is checked", false, ["This is checked", "This is both checked and disabled"]);
      
      expect(renderColumnInstance.state.checkedItems).toEqual([
        {
          label: "This is checked",
          isChecked: false,
          isDisabled: false
        },
        {
          label: "This is both checked and disabled",
          isChecked: false,
          isDisabled: false
        }
      ]);
    });

    it("returns false if searched value doesn't match", () => {
      const res = renderColumnInstance.setCheckedState("This is checked", false, ["This is both checked and disabled"]);
      
      expect(res).toBe(false);
    });
  });

  describe("triggering actions", () => {
    it("updates selected item index on press", () => {
      renderColumnInstance.updateCheckedItems = jest.fn();
      renderColumnInstance.pressHandler(0);
      
      expect(renderColumnInstance.state.selectedIndex).toBe(0);
      expect(renderColumnInstance.updateCheckedItems).toHaveBeenCalled();
    });

    it("executes onPress code", () => {
      renderColumnInstance.pressHandler = jest.fn();
      renderColumn.props().children[0].props.children.props.onPress();
      
      expect(renderColumnInstance.pressHandler).toHaveBeenCalledWith(0);
    });
  });
});
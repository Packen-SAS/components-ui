import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenCheckBox from "../../app/components/PackenCheckBox";
import CheckBoxStyles from "../../app/styles/components/PackenCheckBox";

describe("<PackenCheckBox/>", () => {
  const items = [
    {
      checked: true,
      title: "Checked",
      disabled: false,
    },
    {
      checked: false,
      title: "Unchecked",
      disabled: false,
    },
    {
      checked: null,
      title: "Null",
      disabled: false,
    },
    {
      checked: true,
      title: "Checked",
      disabled: true,
    },
    {
      checked: false,
      title: "Unchecked",
      disabled: true,
    },
    {
      checked: null,
      title: "Null",
      disabled: true,
    }
  ];
  const mock_callback = jest.fn();

  let renderColumn, renderRow, renderColumnInstance, renderRowInstance;

  beforeAll(() => {
    renderColumn = renderer.create(
      <PackenCheckBox
        layout="column"
        items={items}
        notifyParent={mock_callback}
      />
    );
    renderRow = renderer.create(
      <PackenCheckBox
        layout="row"
        items={items}
        notifyParent={mock_callback}
      />
    );

    renderColumnInstance = renderColumn.getInstance();
    renderRowInstance = renderRow.getInstance();

    renderColumnInstance.setState = state => {
      renderColumnInstance.state = state;
    }
    renderColumnInstance.setState({ items: items });
  });

  describe("rendering", () => {
    it("renders column layout correctly", () => {
      expect(renderColumn).toBeDefined();
    });

    it("renders row layout correctly", () => {
      expect(renderRow).toBeDefined();
    });

    it("returns items", () => {
      const returnedItems = renderColumnInstance.get_items();
      const mappedItems = items.map(renderColumnInstance.map_items);
      expect(returnedItems[0].key).toEqual(mappedItems[0].key);
    });

    it("maps an item", () => {
      const renderedItem = renderColumnInstance.map_items({ checked: true, disabled: false, title: "Test"}, 0);
      expect(renderedItem).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("changes inner state if not disabled", () => {
      renderColumnInstance.change_state(0, false, false);
      expect(renderColumnInstance.state.items[0].checked).toBe(true);
      expect(mock_callback).toHaveBeenCalled();
    });
  });

  describe("styling", () => {
    it("returns correct styles if disabled and checked", () => {
      const returnedStyles = renderColumnInstance.get_styles_checkbox(true, true);
      expect(returnedStyles).toBe(CheckBoxStyles.content.disabled);
    });

    it("returns correct styles if disabled and not checked", () => {
      const returnedStyles = renderColumnInstance.get_styles_checkbox(true, false);
      expect(returnedStyles).toBe(CheckBoxStyles.content.disabledUnChecked);
    });

    it("returns correct styles if disabled without a defined checked state", () => {
      const returnedStyles = renderColumnInstance.get_styles_checkbox(true, undefined);
      expect(returnedStyles).toBe(CheckBoxStyles.content.disabledCheckUnChecked);
    });

    it("returns correct styles if there's no defined disabled state and it's checked", () => {
      const returnedStyles = renderColumnInstance.get_styles_checkbox(undefined, true);
      expect(returnedStyles).toBe(CheckBoxStyles.content.active);
    });

    it("returns correct styles if there's no defined disabled state and it's not checked", () => {
      const returnedStyles = renderColumnInstance.get_styles_checkbox(undefined, false);
      expect(returnedStyles).toBe(CheckBoxStyles.content.active);
    });

    it("returns correct styles if there's no defined disabled and checked states", () => {
      const returnedStyles = renderColumnInstance.get_styles_checkbox(undefined, undefined);
      expect(returnedStyles).toBe(CheckBoxStyles.content.default);
    });
  });
});
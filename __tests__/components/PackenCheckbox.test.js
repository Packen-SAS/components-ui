import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenCheckbox from "../../app/components/PackenCheckbox";

describe("<PackenCheckbox/>", () => {
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

  const mock_callback = jest.fn();

  let renderColumn, renderRow, renderColumnInstance;

  beforeAll(() => {
    renderColumn = renderer.create(
      <PackenCheckbox
        layout="column"
        items={items}
        callback={mock_callback}
      />
    );
    renderRow = renderer.create(
      <PackenCheckbox
        layout="row"
        items={items}
        callback={mock_callback}
      />
    );

    renderColumnInstance = renderColumn.getInstance();

    renderColumnInstance.setState = state => {
      renderColumnInstance.state = {
        ...renderColumnInstance.state,
        ...state
      };
    }
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

  describe("state changing", () => {
    it("updates checked items if selectedIndex is defined", () => {
      renderColumnInstance.setState({ selectedIndex: 0 });
      renderColumnInstance.props.callback = jest.fn();
      renderColumnInstance.updateCheckedItems();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderColumnInstance.state.checkedItems).toStrictEqual([{
          label: "This is checked",
          isChecked: false,
          isDisabled: false
        },
        {
          label: "This is both checked and disabled",
          isChecked: false,
          isDisabled: false
        }]);

        const innerTimeout = setTimeout(() => {
          expect(renderColumnInstance.props.callback).toHaveBeenCalledWith([items[2].label]);
          clearTimeout(innerTimeout);
        }, 2000);

        clearTimeout(timeout);
      }, 2000);
    });

    it("sets checked state programmatically if searched value matches", () => {
      renderColumnInstance.setCheckedState("This is checked", false, ["This is checked", "This is both checked and disabled"]);
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderColumnInstance.state.checkedItems).toStrictEqual([
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
        clearTimeout(timeout);
      }, 2000);
    });
  });

  describe("triggering actions", () => {
    it("updates selected item index on press", () => {
      renderColumnInstance.updateCheckedItems = jest.fn();
      renderColumnInstance.pressHandler(0);
      expect(renderColumnInstance.state.selectedIndex).toBe(0);

      /* Review to avoid using setTimeOut */
      const timeout = setTimeout(() => {
        expect(renderColumnInstance.updateCheckedItems).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 4000);
    });
  });
});
import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenRadio from "../../app/components/PackenRadio";

describe("<PackenRadio/>", () => {
  let renderColumn, renderRow, renderColumnInstance;

  beforeAll(() => {
    renderColumn = renderer.create(
      <PackenRadio layout="column" items={[
        {
          label: "Place your text",
          isDisabled: false
        },
        {
          label: "Different text",
          isDisabled: false
        },
        {
          label: "This text is both checked and disabled",
          isDisabled: true
        }
      ]} initialIndex={2}/>
    );

    renderRow = renderer.create(
      <PackenRadio layout="row" items={[
        {
          label: "Placeholder",
          isDisabled: false
        },
        {
          label: "This is checked",
          isDisabled: false
        },
        {
          label: "Some other text",
          isDisabled: false
        }
      ]} initialIndex={1}/>
    );

    renderColumnInstance = renderColumn.getInstance();
    renderColumnInstance.setState = state => {
      renderColumnInstance.state = {
        ...renderColumnInstance.state,
        ...state
      }
    }
    renderColumnInstance.setState({
      checkedIndex: 2,
      currentSelection: ""
    });
  });

  describe("rendering", () => {
    it("renders a column layout correctly", () => {
      expect(renderColumn).toBeDefined();
    });

    it("renders a row layout correctly", () => {
      expect(renderRow).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("updates checked index", () => {
      renderColumnInstance.updateCheckedIndex(0);
      expect(renderColumnInstance.state.checkedIndex).toBe(0);
    });

    it("updates current selection", () => {
      renderColumnInstance.updateCurrentSelection("Test");
      expect(renderColumnInstance.state.currentSelection).toBe("Test");
    });

    it("sets new checked index programmatically", () => {
      renderColumnInstance.setCheckedIndex(0);

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderColumnInstance.state.checkedIndex).toBe(0);
        clearTimeout(timeout);
      }, 2000);
    });
  });

  describe("triggering actions", () => {
    it("find current selection", () => {
      renderColumnInstance.props = {
        items: [
          {
            label: "Place your text",
            isDisabled: false
          },
          {
            label: "Different text",
            isDisabled: false
          },
          {
            label: "This text is both checked and disabled",
            isDisabled: true
          }
        ]
      };
      renderColumnInstance.setState({ checkedIndex: 2 });
      const foundSelection = renderColumnInstance.findCurrentSelection();
      expect(foundSelection.label).toBe("This text is both checked and disabled");
    });

    it("updates current selection on checkedIndex change", () => {
      const prevState = { checkedIndex: 0 };
      renderColumnInstance.updateCurrentSelection = jest.fn();
      renderColumnInstance.setState({ checkedIndex: 1 });
      renderColumnInstance.componentDidUpdate(null, prevState, null);
      expect(renderColumnInstance.updateCurrentSelection).toHaveBeenCalled();
    });

    it("can use latest currentSelection", () => {
      const prevState = { currentSelection: "Test 1" };
      renderColumnInstance.setState({ currentSelection: "Test 2" });
      const response = renderColumnInstance.componentDidUpdate(null, prevState, null);
      expect(response).toBe("Test 2");
    });

    it("executes callback if passed via props", () => {
      renderColumnInstance.props.callback = jest.fn();
      const prevState = { currentSelection: 1 };
      renderColumnInstance.setState({ currentSelection: 0 });
      renderColumnInstance.componentDidUpdate(null, prevState, null);
      expect(renderColumnInstance.props.callback).toHaveBeenCalledWith(renderColumnInstance.state.currentSelection);
    });
  });
});
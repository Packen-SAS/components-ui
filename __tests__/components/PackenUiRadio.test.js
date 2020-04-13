import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiRadio from "../../app/components/PackenUiRadio";

describe("<PackenUiRadio/>", () => {
  let renderColumn, renderRow, renderColumnInstance;

  beforeAll(() => {
    renderColumn = shallow(
      <PackenUiRadio layout="column" items={[
        {
          label: "Place your text",
          value: "Place your text",
          isDisabled: false
        },
        {
          label: "Different text",
          value: "Different text",
          isDisabled: false
        },
        {
          label: "This text is both checked and disabled",
          value: "This text is both checked and disabled",
          isDisabled: true
        }
      ]} initialIndex={2}/>
    );

    renderRow = shallow(
      <PackenUiRadio layout="row" items={[
        {
          label: "Placeholder",
          value: "Placeholder",
          isDisabled: false
        },
        {
          label: "This is checked",
          vallue: "This is checked",
          isDisabled: false
        },
        {
          label: "Some other text",
          value: "Some other text",
          isDisabled: false
        }
      ]} initialIndex={1}/>
    );
    renderColumnInstance = renderColumn.instance();

    renderColumn.setState({
      checkedIndex: 2,
      currentSelection: {
        label: "Different text",
        value: "Different text",
        isDisabled: false
      }
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

      expect(renderColumnInstance.state.checkedIndex).toBe(0);
    });
  });

  describe("triggering actions", () => {
    it("find current selection", () => {
      renderColumn.setProps({
        items: [
          {
            label: "Place your text",
            value: "Place your text",
            isDisabled: false
          },
          {
            label: "Different text",
            value: "Different text",
            isDisabled: false
          },
          {
            label: "This text is both checked and disabled",
            value: "This text is both checked and disabled",
            isDisabled: true
          }
        ]
      });
      renderColumnInstance.setState({ checkedIndex: 2 });
      const foundSelection = renderColumnInstance.findCurrentSelection();
      
      expect(foundSelection.label).toBe("This text is both checked and disabled");
    });

    it("updates current selection on checkedIndex change", () => {
      const spyUpdateCurrentSelection = jest.spyOn(renderColumnInstance, "updateCurrentSelection");
      const prevState = {
        checkedIndex: 0,
        currentSelection: {
          label: "Test",
          value: "Test",
          isDisabled: false
        }
      };
      renderColumnInstance.setState({ checkedIndex: 1 });
      renderColumnInstance.componentDidUpdate(null, prevState, null);
      
      expect(spyUpdateCurrentSelection).toHaveBeenCalled();
      spyUpdateCurrentSelection.mockRestore();
    });

    it("can use latest currentSelection", () => {
      const prevState = {
        currentSelection: {
          label: "Test",
          value: "Test",
          isDisabled: false
        }
      };
      const response = renderColumnInstance.componentDidUpdate(null, prevState, null);
      
      expect(response).toEqual({
        label: "Different text",
        value: "Different text",
        isDisabled: false
      });
    });

    it("executes callback if passed via props", () => {
      renderColumn.setProps({
        callback: jest.fn(),
        name: "radios1"
      });
      const prevState = { currentSelection: 1 };
      renderColumnInstance.setState({ currentSelection: 0 });
      renderColumnInstance.componentDidUpdate(null, prevState, null);
      
      expect(renderColumnInstance.props.callback).toHaveBeenCalledWith("radios1", renderColumnInstance.state.currentSelection.value);
    });
  });

  describe("styling", () => {
    it("disables pointer events if it's part of a dropdown", () => {
      renderColumn.setProps({
        layout: "dropdown"
      });
      renderColumn.props().children.forEach(child => {
        expect(child.props.pointerEvents).toBe("none");
      });
    });

    it("enables pointer events if it's not part of a dropdown", () => {
      renderColumn.setProps({
        layout: "column"
      });
      renderColumn.props().children.forEach(child => {
        expect(child.props.pointerEvents).toBe("auto");
      });
    });
  });
});
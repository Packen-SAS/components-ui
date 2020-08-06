import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiRadio from "../../app/components/PackenUiRadio";

describe("<PackenUiRadio/>", () => {
  let renderColumn, renderRow, renderColumnInstance;
  const mockCallback = jest.fn();

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
      ]} name="radios1" initialIndex={2}/>
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
      ]} name="radios2" initialIndex={1}/>
    );
    renderColumnInstance = renderColumn.instance();

    renderColumn.setState({
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
      ],
      callback: mockCallback,
      name: "radios1",
      layout: "column",
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

    it("executes the instance callback on componentDidMount if provided", () => {
      renderColumn.setProps({ instance: jest.fn() });
      renderColumnInstance.componentDidMount();

      expect(renderColumnInstance.props.instance).toHaveBeenCalled();
    });

    it("can use latest currentSelection", () => {
      const prevState = { checkedIndex: 0, currentSelection: { label: "Test", value: "Test", isDisabled: false } };
      renderColumnInstance.setState({ checkedIndex: 1, currentSelection: { label: "Different text", value: "Different text", isDisabled: false } });
      const response = renderColumnInstance.componentDidUpdate(null, prevState);
      expect(response).toEqual({
        label: "Different text",
        value: "Different text",
        isDisabled: false
      });
    });

    it("executes callback if passed via props", () => {
      renderColumnInstance.setState({ callback: jest.fn() });
      const prevState = { currentSelection: 1 };
      renderColumnInstance.setState({ currentSelection: 0 });
      renderColumnInstance.componentDidUpdate(null, prevState, null);
      
      expect(renderColumnInstance.state.callback).toHaveBeenCalledWith("radios1", renderColumnInstance.state.currentSelection.value);
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

  describe("state changing", () => {
    it("updates checked index", () => {
      renderColumnInstance.setCheckedIndex(0);

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

    it("returns incoming props as the state key-value pairs", () => {
      renderColumn.setProps({
        items: undefined,
        initialIndex: undefined,
        callback: undefined,
        name: undefined,
        layout: undefined,
        styling: undefined
      });
      const res = renderColumnInstance.setPropsToState();

      expect(res).toEqual({
        items: [],
        checkedIndex: -1,
        callback: false,
        name: "",
        layout: "column",
        styling: { container: {}, item: {}, control: {} }
      });
    });

    it("returns incoming props as the state key-value pairs if a callback is provided", () => {
      renderColumn.setProps({ callback: mockCallback });
      const res = renderColumnInstance.setPropsToState();

      expect(res.callback).toBe(mockCallback);
    });

    it("returns incoming props as the state key-value pairs if a checkedIndex of 0 is provided", () => {
      renderColumn.setProps({ initialIndex: 0 });
      const res = renderColumnInstance.setPropsToState();

      expect(res.checkedIndex).toBe(0);
    });

    it("returns incoming props as the state key-value pairs if styling is provided", () => {
      renderColumn.setProps({ styling: { test: "Test" } });
      const res = renderColumnInstance.setPropsToState();
      expect(res.styling).toEqual({ test: "Test" });
    });
  });
});
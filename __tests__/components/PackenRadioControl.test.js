import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenRadioControl from "../../app/components/PackenRadioControl";

describe("<PackenRadioControl/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = renderer.create(
      <PackenRadioControl
        checkedIndex={0}
        selfIndex={1}
        label="Test"
        isDisabled={false}
        updateCheckedIndex={mockCallback} />
    );

    renderInstance = render.getInstance();
    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      }
    }
    renderInstance.setState({
      state: "default"
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("sets state as 'default_disabled'", () => {
      renderInstance.props = { isDisabled: true, checkedIndex: 0, selfIndex: 1 };
      renderInstance.checkIfDisabled();
      expect(renderInstance.state.state).toBe("default_disabled");
    });

    it("sets state as 'checked_disabled'", () => {
      renderInstance.props = { isDisabled: true, checkedIndex: 0, selfIndex: 0 };
      renderInstance.checkIfDisabled();
      expect(renderInstance.state.state).toBe("checked_disabled");
    });

    it("returns 'false' if it's not disabled", () => {
      renderInstance.props = { isDisabled: false };
      const newState = renderInstance.checkIfDisabled();
      expect(newState).toBe(false);
    });

    it("sets state as 'default'", () => {
      renderInstance.props = { checkedIndex: 0, selfIndex: 1 };
      renderInstance.checkIfChecked();
      expect(renderInstance.state.state).toBe("default");
    });

    it("sets state as 'checked'", () => {
      renderInstance.props = { checkedIndex: 0, selfIndex: 0 };
      renderInstance.checkIfChecked();
      expect(renderInstance.state.state).toBe("checked");
    });
  });

  describe("triggering actions", () => {
    it("triggers actions on componentDidMount", () => {
      renderInstance.checkIfChecked = mockCallback;
      renderInstance.checkIfDisabled = mockCallback;
      renderInstance.componentDidMount();
      expect(renderInstance.checkIfChecked).toHaveBeenCalled();
      expect(renderInstance.checkIfDisabled).toHaveBeenCalled();
    });

    it("sets checked state onPress", () => {
      renderInstance.props = { updateCheckedIndex: mockCallback, selfIndex: 0 }
      renderInstance.onPressHandler();
      expect(renderInstance.state.state).toBe("checked");
    });

    it("triggers actions on componentDidUpdate if checkedIndex changed", () => {
      const prevProps = { checkedIndex: 0 };
      renderInstance.props = { checkedIndex: 1 };
      renderInstance.checkIfChecked = mockCallback;
      renderInstance.checkIfDisabled = mockCallback;
      renderInstance.componentDidUpdate(prevProps, null, null);
      expect(renderInstance.checkIfChecked).toHaveBeenCalled();
      expect(renderInstance.checkIfDisabled).toHaveBeenCalled();
    });
  });
});
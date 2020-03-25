import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenRadioControl from "../../app/components/PackenRadioControl";

describe("<PackenRadioControl/>", () => {
  let render, renderInstance;
  const mock_callback = jest.fn();

  beforeAll(() => {
    render = renderer.create(
      <PackenRadioControl
        checkedIndex={0}
        selfIndex={1}
        label="Test"
        isDisabled={false}
        updateCheckedIndex={mock_callback} />
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
      renderInstance.check_if_disabled();
      expect(renderInstance.state.state).toBe("default_disabled");
    });

    it("sets state as 'checked_disabled'", () => {
      renderInstance.props = { isDisabled: true, checkedIndex: 0, selfIndex: 0 };
      renderInstance.check_if_disabled();
      expect(renderInstance.state.state).toBe("checked_disabled");
    });

    it("returns 'false' if it's not disabled", () => {
      renderInstance.props = { isDisabled: false };
      const newState = renderInstance.check_if_disabled();
      expect(newState).toBe(false);
    });

    it("sets state as 'default'", () => {
      renderInstance.props = { checkedIndex: 0, selfIndex: 1 };
      renderInstance.check_if_checked();
      expect(renderInstance.state.state).toBe("default");
    });

    it("sets state as 'checked'", () => {
      renderInstance.props = { checkedIndex: 0, selfIndex: 0 };
      renderInstance.check_if_checked();
      expect(renderInstance.state.state).toBe("checked");
    });
  });

  describe("triggering actions", () => {
    it("triggers actions on componentDidMount", () => {
      renderInstance.check_if_checked = mock_callback;
      renderInstance.check_if_disabled = mock_callback;
      renderInstance.componentDidMount();
      expect(renderInstance.check_if_checked).toHaveBeenCalled();
      expect(renderInstance.check_if_disabled).toHaveBeenCalled();
    });

    it("sets checked state onPress", () => {
      renderInstance.props = { updateCheckedIndex: mock_callback, selfIndex: 0 }
      renderInstance.onPress_handler();
      expect(renderInstance.state.state).toBe("checked");
    });

    it("triggers actions on componentDidUpdate if checkedIndex changed", () => {
      const prevProps = { checkedIndex: 0 };
      renderInstance.props = { checkedIndex: 1 };
      renderInstance.check_if_checked = mock_callback;
      renderInstance.check_if_disabled = mock_callback;
      renderInstance.componentDidUpdate(prevProps, null, null);
      expect(renderInstance.check_if_checked).toHaveBeenCalled();
      expect(renderInstance.check_if_disabled).toHaveBeenCalled();
    });
  });
});
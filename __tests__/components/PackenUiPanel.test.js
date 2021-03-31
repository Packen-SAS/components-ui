import PackenUiPanel from "../../app/components/PackenUiPanel";
import { View } from "react-native";
import { shallow } from "enzyme";
import React from "react";

describe("<PackenUiPanel/>", () => {
  let render, instance, renderAlt, instanceAlt;
  const mockOnPanelReady = jest.fn();
  beforeAll(() => {
    render = shallow(
      <PackenUiPanel
        isHidden
        initialHeight={123}
        windowHeight={1234}
        windowFraction={0.5}
        onPanelReady={mockOnPanelReady}
      >
        <View />
      </PackenUiPanel>
    );
    instance = render.instance();

    renderAlt = shallow(
      <PackenUiPanel
        windowHeight={1234}
        windowFraction={0.5}
      >
        <View />
      </PackenUiPanel>
    );
    instanceAlt = renderAlt.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
      expect(renderAlt).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("tests the placeholder function", () => {
      const res = instance.ignoreAction();
      expect(res).toBe(true);
    });
  });

  describe("state changing", () => {
    it("sets panel height to the state", () => {
      instance.getPanelHeight({ nativeEvent: { layout: { height: 321 } } });
      expect(instance.state.panel.height).toBeDefined();
      expect(instance.state.panel.originalHeight).toBe(321);
      expect(instance.state.panel.gotOriginal).toBe(true);

      instance.getPanelHeight({ nativeEvent: { layout: { height: 123 } } });
      expect(instance.state.panel.originalHeight).toBe(321);
    });

    it("handles the pan event on the handler element", () => {
      instance.setState({ panel: { height: 123 } });
      const res = instance.panHandler();
      expect(res).toBeUndefined();

      const mockSetValue = jest.fn();
      [25, 100].forEach((val, i) => {
        mockSetValue.mockReset();
        render.setProps({ windowHeight: 1000, windowFraction: 0.5 });
        instance.setState({
          panel: {
            originalHeight: val,
            height: {
              __getValue: jest.fn(() => 100),
              setValue: mockSetValue
            }
          }
        });
        instance.panHandler({ nativeEvent: { translationY: 50 } });
        if (i === 0) {
          expect(mockSetValue).toHaveBeenCalledWith(50);
        } else {
          expect(mockSetValue).not.toHaveBeenCalled();
        }
      });
    });
  });
});

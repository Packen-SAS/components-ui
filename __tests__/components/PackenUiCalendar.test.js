import PackenUiCalendar from "../../app/components/PackenUiCalendar";
import { shallow } from "enzyme";
import React from "react";
import { Platform } from "react-native";
import { Appearance } from "react-native";

jest.mock("react-native/Libraries/Utilities/Appearance", () => ({
  getColorScheme: jest.fn()
}));

describe("<PackenUiCalendar/>", () => {
  let render, instance, renderAlt;
  const mockDate = new Date();
  const mockOnChange = jest.fn();
  const mockOnRequestClose = jest.fn();
  beforeAll(() => {
    render = shallow(
      <PackenUiCalendar
        mode="date"
        label="test"
        isOpen={true}
        value={mockDate}
        display="calendar"
        minimumDate={mockDate}
        onChange={mockOnChange}
        onRequestClose={mockOnRequestClose}
      />
    );
    instance = render.instance();
    renderAlt = shallow(<PackenUiCalendar />);
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
      expect(renderAlt).toBeDefined();
    });

    it("returns the main component elements", () => {
      Platform.OS = "ios";
      let res = instance.getRender();
      expect(res).toBeDefined();

      [true, false].forEach((val) => {
        Platform.OS = "android";
        instance.setState({ isOpen: val });
        res = instance.getRender();
        if (val) {
          expect(res).toBeDefined();
        } else {
          expect(res).toBeNull();
        }
      });
    });
  });

  describe("triggering actions", () => {
    it("tests the placeholder function", () => {
      const res = instance.mockFn();
      expect(res).toBe(false);
    });

    it("closes date picker", () => {
      instance.closePicker();
      expect(mockOnRequestClose).toHaveBeenCalled();
    });

    it("handles a new date selection", () => {
      const spyClosePicker = jest.spyOn(instance, "closePicker");
      ["ios", "android"].forEach((platform, i) => {
        spyClosePicker.mockReset();
        Platform.OS = platform;
        const date = new Date();
        instance.onChangeHandler({ test: "test" }, date);
        expect(mockOnChange).toHaveBeenCalledWith({ test: "test" }, date);
        if (i === 0) {
          expect(spyClosePicker).not.toHaveBeenCalled();
        } else {
          expect(spyClosePicker).toHaveBeenCalled();
        }
      });
      spyClosePicker.mockRestore();
    });
  });

  describe("state changing", () => {
    it("updates component with new props on componentDidUpdate", () => {
      render.setProps({ label: "test 2" });
      instance.componentDidUpdate({ label: "test" });
      expect(instance.state.label).toBe("test 2");
    });
  });

  describe("styling", () => {
    it("returns the panel background color for iOS depending on the device appearance mode", () => {
      Appearance.getColorScheme.mockReturnValueOnce("light");
      let res = instance.getPanelBg();
      expect(res).toBe("#FFFFFF");

      Appearance.getColorScheme.mockReturnValueOnce("dark");
      res = instance.getPanelBg();
      expect(res).toBe("#304D6D");
    });
  });
});

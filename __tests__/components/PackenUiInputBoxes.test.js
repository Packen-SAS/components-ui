import "react-native";
import React from "react";
import { shallow } from "enzyme";

import * as UTIL from "../../app/utils";
import PackenUiInputBoxes from "../../app/components/PackenUiInputBoxes";

describe("<PackenUiInputBoxes/>", () => {
  const mockCallback = jest.fn();
  const render = shallow(
    <PackenUiInputBoxes
      boxes={4}
      emitCode={mockCallback}
    />
  );
  const renderInstance = render.instance();

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders a box", () => {
      const res = renderInstance.renderBox(0);
      expect(res).toBeDefined();
      expect(res.key).toBe("0");
    });
  });

  describe("triggering actions", () => {
    it("sets an input ref", () => {
      renderInstance.setInputRef({}, 0);
      expect(renderInstance.items[0]).toEqual({ ref: 0, input: {}, text: null });
    });

    it("returns the code string", () => {
      renderInstance.items = [
        { ref: 0, input: {}, text: "1" },
        { ref: 1, input: {}, text: "2" },
        { ref: 2, input: {}, text: "3" },
        { ref: 3, input: {}, text: "4" }
      ];
      const res = renderInstance.getVerificationCode();
      expect(res).toBe("1234");
    });

    it("returns the correct code string if any input is null", () => {
      renderInstance.items = [
        { ref: 0, input: {}, text: "1" },
        { ref: 1, input: {}, text: null },
        { ref: 2, input: {}, text: "3" },
        { ref: 3, input: {}, text: "4" }
      ];
      const res = renderInstance.getVerificationCode();
      expect(res).toBe("134");
    });

    it("handles the on submit if items don't match", () => {
      renderInstance.items = [
        { ref: 0, input: { focus: mockCallback }, text: "1" },
        { ref: 1, input: { focus: mockCallback }, text: "2" },
        { ref: 2, input: { focus: mockCallback }, text: "3" },
        { ref: 3, input: { focus: mockCallback }, text: "4" }
      ];
      renderInstance.handleOnSubmit(0);
      expect(renderInstance.items[1].input.focus).toHaveBeenCalled();

      renderInstance.items[0].text = null;
      const res = renderInstance.handleOnSubmit(0);
      expect(res).toBe(undefined);
    });

    it("handles the on submit if items match", () => {
      renderInstance.items = [
        { ref: 0, input: { focus: mockCallback }, text: "1" },
        { ref: 1, input: { focus: mockCallback }, text: "2" },
        { ref: 2, input: { focus: mockCallback }, text: "3" },
        { ref: 3, input: { focus: mockCallback }, text: "4" }
      ];
      render.setProps({ emitCode: mockCallback });
      renderInstance.handleOnSubmit(3);
      expect(renderInstance.props.emitCode).toHaveBeenCalledWith("1234");

      render.setProps({ emitCode: undefined });
      let res = renderInstance.handleOnSubmit(3);
      expect(res).toBe(undefined);

      renderInstance.items[3].text = null;
      res = renderInstance.handleOnSubmit(3);
      expect(res).toBe(undefined);
    });

    it("clears the inputs", () => {
      renderInstance.items = [
        { ref: 0, input: { clear: mockCallback }, text: "1" },
        { ref: 1, input: { clear: mockCallback }, text: "2" },
        { ref: 2, input: { clear: mockCallback }, text: "3" },
        { ref: 3, input: { clear: mockCallback }, text: "4" }
      ];
      const res = renderInstance.clearInputs();

      expect(res).toBe(0);
      renderInstance.items.forEach(item => {
        expect(item.input.clear).toHaveBeenCalled();
      });

      renderInstance.items[1].input = null;
      renderInstance.clearInputs();
      renderInstance.items.forEach(item => {
        if (item.input === null) {
          expect(mockCallback).toHaveBeenCalledTimes(9);
        }
      });
    });

    it("handles the text input event", () => {
      renderInstance.items = [
        { ref: 0, input: { clear: mockCallback, focus: mockCallback, blur: mockCallback }, text: "0" },
        { ref: 1, input: { clear: mockCallback, focus: mockCallback, blur: mockCallback }, text: "1" },
        { ref: 2, input: { clear: mockCallback, focus: mockCallback, blur: mockCallback }, text: "a" },
        { ref: 3, input: { clear: mockCallback, focus: mockCallback, blur: mockCallback }, text: "b" }
      ];
      render.setProps({ emitCode: mockCallback });
      renderInstance.handleInputText(0, "abc");
      expect(renderInstance.items[0].input.clear).toHaveBeenCalled();

      renderInstance.handleInputText(0, "123");
      expect(renderInstance.items[0].text).toBe("123");
      expect(renderInstance.items[1].input.focus).toHaveBeenCalled();

      renderInstance.handleInputText(3, "123");
      expect(renderInstance.items[3].input.blur).toHaveBeenCalled();
      expect(renderInstance.props.emitCode).toHaveBeenCalled();

      render.setProps({ emitCode: undefined });
      const res = renderInstance.handleInputText(3, "123");
      expect(res).toBe(undefined);
    });
  });

  describe("state changing", () => {
    it("executes the correct code on componentDidMount", () => {
      render.setProps({ boxes: 4 });
      renderInstance.items = [];
      renderInstance.componentDidMount();
      expect(renderInstance.state.boxes).toBeDefined();
      expect(renderInstance.state.boxes.length).toBe(4);
    });
  })
});
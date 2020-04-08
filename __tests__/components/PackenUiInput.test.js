import "react-native";
import React from "react";
import { shallow } from "enzyme";

import InputStyles from "../../app/styles/components/PackenUiInput";

import PackenUiInput from "../../app/components/PackenUiInput";

describe("<PackenUiInput/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenUiInput
        size="tiny"
        placeholder="Placeholder"
        onChangeText={mockCallback}
        icon={{
          name: "lock",
          position: "left"
        }}
        message={{
          text: "Caption text, description, error notification",
          icon: "info"
        }}
        label="Label tiny"
        help="Help text tiny"
        theme="default"
      />
    );

    renderInstance = render.instance();

    renderInstance.setState({
      value: "",
      state: "default",
      dimensions: {
        box: {
          width: 0,
          height: 0
        },
        iconWrapper: {
          width: 0,
          height: 0
        }
      }
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders help content if provided", () => {
      render.setProps({
        help: "Test"
      });
      const returnedElement = renderInstance.getHelp();

      expect(returnedElement).toBeDefined();
    });

    it("renders a clickable help content if provided", () => {
      render.setProps({
        help: {
          text: "Test",
          touchable: true,
          callback: mockCallback
        }
      });
      const returnedElement = renderInstance.getHelp();

      expect(returnedElement).toBeDefined();
    });

    it("renders null if no help is provided", () => {
      render.setProps({
        help: undefined
      });
      const returnedElement = renderInstance.getHelp();

      expect(returnedElement).toBe(null);
    });

    it("renders a message without an icon", () => {
      render.setProps({
        message: {
          text: "Test",
          icon: undefined
        }
      });
      const spyGetMessageIcon = jest.spyOn(renderInstance, "getMessageIcon");
      const returnedElement = renderInstance.getMessage();

      expect(returnedElement).toBeDefined();
      expect(spyGetMessageIcon).toHaveBeenCalled();
      spyGetMessageIcon.mockRestore();
    });

    it("renders a message with an icon", () => {
      render.setProps({
        message: {
          text: "Test",
          icon: "check"
        }
      });
      const spyGetMessageIcon = jest.spyOn(renderInstance, "getMessageIcon");
      const returnedElement = renderInstance.getMessage();

      expect(returnedElement).toBeDefined();
      expect(spyGetMessageIcon).toHaveBeenCalled();
      spyGetMessageIcon.mockRestore();
    });

    it("renders null if a message is not defined", () => {
      render.setProps({
        message: undefined
      });
      const returnedElement = renderInstance.getMessage();

      expect(returnedElement).toBe(null);
    });

    it("renders a message icon if provided", () => {
      render.setProps({
        message: {
          text: "Test",
          icon: "check"
        }
      });
      const returnedElement = renderInstance.getMessageIcon();

      expect(returnedElement).toBeDefined();
    });

    it("renders a null if no message icon is provided", () => {
      render.setProps({
        message: {
          text: "Test",
          icon: undefined
        }
      });
      const returnedElement = renderInstance.getMessageIcon();

      expect(returnedElement).toBe(null);
    });

    it("renders the icon wrapper", () => {
      const returnedElement = renderInstance.getIconWrapper((""));
      expect(returnedElement).toBeDefined();
    });

    it("returns null as the main icon if not provided", () => {
      render.setProps({ icon: undefined });
      const returnedElement = renderInstance.getMainIcon();

      expect(returnedElement).toBe(null);
    });

    it("returns a clickable as the main icon if provided", () => {
      render.setProps({ icon: { name: "user", position: "right", callback: mockCallback } });
      const returnedElement = renderInstance.getMainIcon();

      expect(returnedElement).toBeDefined();
    });
  });

  describe("styling", () => {
    it("disables pointer events if its state is 'disabled'", () => {
      renderInstance.setState({ state: "disabled" });
      
      expect(render.props().pointerEvents).toBe("none");
    });

    it("enables pointer events if its state is no 'disabled'", () => {
      renderInstance.setState({ state: "default" });
      
      expect(render.props().pointerEvents).toBe("auto");
    });

    it("returns icon position styles if icon position is 'left'", () => {
      render.setProps({
        size: "small",
        icon: {
          position: "left"
        }
      });
      renderInstance.setState({
        dimensions: {
          box: {
            height: 10
          },
          iconWrapper: {
            height: 6
          }
        }
      });
      const returnedStyles = renderInstance.setIconPositionStyles();
      
      expect(returnedStyles).toEqual({
        top: 2,
        left: InputStyles.icon_wrapper.offset.small
      });
    });

    it("returns icon position styles if icon position is 'right'", () => {
      render.setProps({
        size: "small",
        icon: {
          position: "right"
        }
      });
      renderInstance.setState({
        dimensions: {
          box: {
            height: 10
          },
          iconWrapper: {
            height: 6
          }
        }
      });
      const returnedStyles = renderInstance.setIconPositionStyles();
      
      expect(returnedStyles).toEqual({
        top: 2,
        right: InputStyles.icon_wrapper.offset.small
      });
    });

    it("returns an empty object if there's no icon passed", () => {
      render.setProps({ icon: undefined });
      const returnedStyles = renderInstance.setIconPositionStyles();

      expect(returnedStyles).toEqual({});
    });

    it("returns current padding styles if has an icon", () => {
      render.setProps({
        icon: {
          position: "left"
        },
        size: "tiny"
      });
      const returnedStyles = renderInstance.getPaddingStyles();
      
      expect(returnedStyles).toBeDefined();
    });

    it("returns empty padding styles if there's no icon", () => {
      renderInstance.props = {};
      const returnedStyles = renderInstance.getPaddingStyles();
      
      expect(returnedStyles).toEqual({});
    });

    it("returns multiline styles if it's a textarea", () => {
      render.setProps({
        multiline: true,
        size: "tiny"
      });
      const returnedStyles = renderInstance.getMultilineStyles();
      
      expect(returnedStyles).toBeDefined();
    });

    it("returns empty multiline styles if it's not a textarea", () => {
      renderInstance.props = {};
      const returnedStyles = renderInstance.getMultilineStyles();

      expect(returnedStyles).toEqual({});
    });

    it("returns the correct icon name if it's not part of a dropdown", () => {
      render.setProps({
        isDropdown: false,
        icon: {
          name: "check",
          position: "left"
        }
      });
      const returnedName = renderInstance.getIconName();

      expect(returnedName).toBe("check");
    });

    it("returns the correct icon name if it's part of a dropdown and is open", () => {
      render.setProps({
        isDropdown: true,
        isOpen: true
      });
      const returnedName = renderInstance.getIconName();

      expect(returnedName).toBe("chevron-up");
    });

    it("returns the correct icon name if it's part of a dropdown and is not open", () => {
      render.setProps({
        isDropdown: true,
        isOpen: false
      });
      const returnedName = renderInstance.getIconName();

      expect(returnedName).toBe("chevron-down");
    });
  });

  describe("getting dimensions", () => {
    it("sets box dimensions", () => {
      const spySetIconPositionStyles = jest.spyOn(renderInstance, "setIconPositionStyles");
      renderInstance.getBoxDimensions({width: 100, height: 100});
      
      expect(renderInstance.state.dimensions).toEqual({
        ...renderInstance.state.dimensions,
        box: {
          width: 100,
          height: 100
        }
      });
      expect(spySetIconPositionStyles).toHaveBeenCalled();
      spySetIconPositionStyles.mockRestore();
    });

    it("sets icon wrapper dimensions", () => {
      const spySetIconPositionStyles = jest.spyOn(renderInstance, "setIconPositionStyles");
      renderInstance.getIconWrapperDimensions({width: 10, height: 10});
      
      expect(renderInstance.state.dimensions).toEqual({
        ...renderInstance.state.dimensions,
        iconWrapper: {
          width: 10,
          height: 10
        }
      });
      expect(spySetIconPositionStyles).toHaveBeenCalled();
      spySetIconPositionStyles.mockRestore();
    });
  });

  describe("state changing", () => {
    it("sets initial state if there's no initial value, it's not disabled, and has no icon", () => {
      render.setProps({
        value: undefined,
        disabled: false,
        icon: undefined
      });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toEqual({
        value: "",
        state: "default",
        ref: null
      });
    });

    it("sets initial state if there's an initial value, it's disabled, and has an icon", () => {
      render.setProps({
        value: "Test",
        disabled: true,
        icon: {
          name: "check",
          position: "right"
        }
      });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toEqual({
        value: "Test",
        state: "disabled",
        ref: null,
        dimensions: {
          box: {
            width: 0,
            height: 0
          },
          iconWrapper: {
            width: 0,
            height: 0
          }
        }
      });
    });
  });

  describe("triggering actions", () => {
    it("disables being editable if set so", () => {
      render.setProps({
        nonEditable: true,
        disabled: true
      });
      const res = renderInstance.setEditable();

      expect(res).toBe(false);
    });

    it("enables being editable if not disabled or non-editable", () => {
      render.setProps({
        nonEditable: false,
        disabled: false
      });
      const res = renderInstance.setEditable();

      expect(res).toBe(true);
    });

    it("changes styles while onPressIn", () => {
      renderInstance.handlePressIn();

      expect(renderInstance.state.state).toBe("hover");
    });

    it("changes styles while onPressOut", () => {
      renderInstance.handlePressOut();

      expect(renderInstance.state.state).toBe("default");
    });

    it("changes styles while onFocus", () => {
      renderInstance.handleFocus();

      expect(renderInstance.state.state).toBe("focus");
    });

    it("changes styles while onBlur", () => {
      renderInstance.handleBlur();

      expect(renderInstance.state.state).toBe("default");
    });

    it("handles onChangeText", () => {
      render.setProps({
        onChangeText: mockCallback
      });
      renderInstance.handleChangeText("Test");

      expect(renderInstance.state.value).toBe("Test");
      expect(mockCallback).toHaveBeenCalled();
    });

    it("executes correct code on componentDidUpdate", () => {
      const prevProps = { value: "Test", isFocused: false };
      const spyCheckFocus = jest.spyOn(renderInstance, "checkFocus");
      render.setProps({
        value: "Test 2",
        isFocused: true
      });
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(renderInstance.state.value).toBe("Test 2");
      expect(spyCheckFocus).toHaveBeenCalled();
      spyCheckFocus.mockRestore();
    });

    it("executes onLayout event callback for the box", () => {
      const spyGetBoxDimensions = jest.spyOn(renderInstance, "getBoxDimensions");
      render.props().children[1].props.onLayout({
        nativeEvent: {
          layout: {}
        }
      });

      expect(spyGetBoxDimensions).toHaveBeenCalled();
      spyGetBoxDimensions.mockRestore();
    });

    it("executes onLayout event callback for the icon if provided", () => {
      const spyGetIconWrapperDimensions = jest.spyOn(renderInstance, "getIconWrapperDimensions");
      render.setProps({
        icon: {
          position: "right"
        }
      });
      render.props().children[1].props.children[0].props.onLayout({
        nativeEvent: {
          layout: {}
        }
      });

      expect(spyGetIconWrapperDimensions).toHaveBeenCalled();
      spyGetIconWrapperDimensions.mockRestore();
    });

    it("returns the keyboard type as 'default' if not provided", () => {
      render.setProps({ keyboardType: undefined });
      const returnedType = renderInstance.getKeyboardType();

      expect(returnedType).toBe("default");
    });

    it("returns the correct keyboard type if provided", () => {
      render.setProps({ keyboardType: "number-pad" });
      const returnedType = renderInstance.getKeyboardType();

      expect(returnedType).toBe("number-pad");
    });

    it("returns the ref", () => {
      const ref = { blur: mockCallback, focus: mockCallback };
      renderInstance.getRef(ref);
      
      expect(renderInstance.state.ref).toEqual(ref);
    });

    it("focuses the input if ref is defined", () => {
      renderInstance.setState({ ref: { focus: mockCallback } });
      renderInstance.focus();

      expect(renderInstance.state.ref.focus).toHaveBeenCalled();
    });

    it("returns false if trying to focus the input and ref is not defined", () => {
      renderInstance.setState({ ref: null });
      const res = renderInstance.focus();

      expect(res).toBe(false);
    });

    it("blurs the input if ref is defined", () => {
      renderInstance.setState({ ref: { blur: mockCallback } });
      renderInstance.blur();

      expect(renderInstance.state.ref.blur).toHaveBeenCalled();
    });

    it("returns false if trying to blur the input and ref is not defined", () => {
      renderInstance.setState({ ref: null });
      const res = renderInstance.blur();

      expect(res).toBe(false);
    });

    it("focuses the input while checking its focus if it's set so", () => {
      render.setProps({ isFocused: true });
      const spyFocus = jest.spyOn(renderInstance, "focus");
      renderInstance.checkFocus();

      expect(spyFocus).toHaveBeenCalled();
      spyFocus.mockRestore();
    });

    it("blurs the input while checking its focus if it's set so", () => {
      render.setProps({ isFocused: false });
      const spyBlur = jest.spyOn(renderInstance, "blur");
      renderInstance.checkFocus();

      expect(spyBlur).toHaveBeenCalled();
      spyBlur.mockRestore();
    });

    it("returns the entry security type as true if set so", () => {
      render.setProps({ isPassword: true });
      const res = renderInstance.getSecureEntryType();
      
      expect(res).toBe(true);
    });

    it("returns the entry security type as false if set so", () => {
      render.setProps({ isPassword: false });
      const res = renderInstance.getSecureEntryType();
      
      expect(res).toBe(false);
    });

    it("triggers the help callback", () => {
      render.setProps({ help: { callback: mockCallback } });
      renderInstance.triggerHelpCallback();

      expect(renderInstance.props.help.callback).toHaveBeenCalled();
    });
  });
});
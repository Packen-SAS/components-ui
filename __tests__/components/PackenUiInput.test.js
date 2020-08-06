import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiInput from "../../app/components/PackenUiInput";
import Colors from "../../app/styles/abstracts/colors";

describe("<PackenUiInput/>", () => {
  let render, renderInstance, renderAlt;
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
        name="input1"
      />
    );
    renderInstance = render.instance();

    renderAlt = shallow(
      <PackenUiInput
        placeholder="Placeholder"
        placeholderTextColor="#000000"
        icon={{
          name: "lock",
          position: "left"
        }}
        message={{
          text: "Caption text, description, error notification",
          icon: "info"
        }}
        help="Help text tiny"
        keyboardType="number-pad"
        style={{ color: "#FFFFFF" }}
        eventHandlers={{
          onFocus: mockCallback,
          onBlur: mockCallback,
          onSubmitEditing: mockCallback
        }}
      />
    );

    renderInstance.setState({
      state: "default",
      icon: {
        name: "lock",
        position: "left"
      },
      size: "tiny",
      theme: "default",
      multiline: false,
      name: "input1",
      disabled: false,
      nonEditable: false,
      isDropdown: false,
      isOpen: false,
      help: "Help text tiny",
      message: {
        text: "Caption text, description, error notification",
        icon: "info"
      },
      keyboardType: "default",
      isFocused: false,
      isPassword: false,
      label: "Label tiny",
      placeholder: "Placeholder",
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

  describe("state changing", () => {
    it("sets initial state if it's not disabled, has no icon, it's not a loader, doesn't have a minimum length, and no validator", () => {
      render.setProps({
        disabled: false,
        icon: false,
        loading: undefined,
        minLength: undefined,
        validator: undefined,
        styling: undefined,
        help: undefined,
        message: undefined
      });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toEqual({
        state: "default",
        icon: false,
        size: "tiny",
        theme: "default",
        multiline: false,
        name: "input1",
        disabled: false,
        nonEditable: false,
        isDropdown: false,
        isOpen: false,
        help: undefined,
        message: false,
        keyboardType: "default",
        isFocused: false,
        isPassword: false,
        label: "Label tiny",
        placeholder: "Placeholder",
        placeholderTextColor: Colors.basic.gray.dft,
        maxLength: undefined,
        style: {},
        onChangeText: mockCallback,
        eventHandlers: false,
        propagateRef: false,
        ref: null,
        loading: false,
        validator: false,
        minLength: 0,
        styling: {
          header: {
            base: {},
            label: {}
          },
          help: {
            touchable: {},
            text: {}
          },
          box: {},
          input: {},
          message: {
            box: {},
            icon: {},
            iconSize: undefined,
            iconColor: undefined,
            text: {}
          },
          loader: {},
          iconWrapper: {},
          icon: {},
          iconSize: undefined,
          iconColor: undefined
        }
      });
    });

    it("sets initial state if it's disabled, and has an icon", () => {
      render.setProps({
        disabled: true,
        icon: {
          name: "check",
          position: "right"
        }
      });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toEqual({
        ...renderInstance.state,
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

    it("sets initial state if it's disabled, has an icon, and has no help", () => {
      render.setProps({
        help: undefined,
        disabled: true,
        icon: {
          name: "check",
          position: "right"
        }
      });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toEqual({
        ...renderInstance.state,
        help: undefined,
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

    it("sets initial state if it's disabled, has an icon, and has a help object", () => {
      render.setProps({
        help: {
          text: "This triggers an internal callback",
          touchable: true,
          callback: this.mockCallback
        },
        disabled: true,
        icon: {
          name: "check",
          position: "right"
        }
      });
      const returnedState = renderInstance.setInitialState();

      expect(returnedState).toEqual({
        ...renderInstance.state,
        help: {
          text: "This triggers an internal callback",
          touchable: true,
          callback: this.mockCallback
        },

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

    it("returns incoming props as the state key-value pairs if placeholder, styling, isPassword, propagateRef, maxLength, minLength, loading and validator are provided", () => {
      render.setProps({
        propagateRef: mockCallback,
        maxLength: 10,
        minLength: 5,
        loading: true,
        isPassword: true,
        validator: "number",
        placeholder: undefined,
        styling: { test: "Test" }
      });
      const res = renderInstance.setPropsToState();

      expect(res.propagateRef).toBe(mockCallback);
      expect(res.maxLength).toBe(10);
      expect(res.minLength).toBe(5);
      expect(res.loading).toBe(true);
      expect(res.isPassword).toBe(true);
      expect(res.placeholder).toBe("");
      expect(res.validator).toBe("number");
      expect(res.styling).toEqual({ test: "Test", header: {}, help: {}, message: {} });
    });
  });

  describe("triggering actions", () => {
    it("triggers the mock callback", () => {
      const res = renderInstance.mockCallback();

      expect(res).toBe(false);
    });

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

    it("changes styles while onFocus", () => {
      renderInstance.handleFocus();

      expect(renderInstance.state.state).toBe("focus");
    });

    it("returns false while onFocus if the theme is 'list'", () => {
      renderInstance.setState({ theme: "list" });
      const res = renderInstance.handleFocus();

      expect(res).toBe(false);
    });

    it("executes event handlers and changes styles while onFocus", () => {
      renderInstance.setState({
        theme: "primary",
        eventHandlers: {
          onFocus: jest.fn()
        }
      });
      renderInstance.handleFocus();

      expect(renderInstance.state.state).toBe("focus");
      expect(renderInstance.state.eventHandlers.onFocus).toHaveBeenCalled();
    });

    it("changes styles while onBlur", () => {
      renderInstance.handleBlur();

      expect(renderInstance.state.state).toBe("default");
    });

    it("executes event handlers and changes styles while onBlur", () => {
      renderInstance.setState({
        eventHandlers: {
          onBlur: jest.fn()
        }
      });
      renderInstance.handleBlur();

      expect(renderInstance.state.state).toBe("default");
      expect(renderInstance.state.eventHandlers.onBlur).toHaveBeenCalled();
    });

    it("changes styles while onSubmitEditing", () => {
      const spyBlur = jest.spyOn(renderInstance, "blur");
      renderInstance.handleSubmitEditing();

      expect(spyBlur).toHaveBeenCalled();
      spyBlur.mockRestore();
    });

    it("executes event handlers and changes styles while onSubmitEditing", () => {
      renderInstance.setState({
        eventHandlers: {
          onSubmitEditing: jest.fn()
        }
      });
      const spyBlur = jest.spyOn(renderInstance, "blur");
      renderInstance.handleSubmitEditing();

      expect(spyBlur).toHaveBeenCalled();
      expect(renderInstance.state.eventHandlers.onSubmitEditing).toHaveBeenCalled();
      spyBlur.mockRestore();
    });

    it("handles onChangeText", () => {
      render.setProps({ onChangeText: mockCallback });
      renderInstance.setState({ name: "Test", validator: false })
      renderInstance.handleChangeText("Test");

      expect(renderInstance.props.onChangeText).toHaveBeenCalledWith("Test", "Test", true);
    });

    it("handles onChangeText if a validator is provided and it's valid", () => {
      render.setProps({ onChangeText: mockCallback });
      renderInstance.setState({ name: "Test", validator: "letters" })
      renderInstance.handleChangeText("Test");

      expect(renderInstance.props.onChangeText).toHaveBeenCalledWith("Test", "Test", true);
    });

    it("handles onChangeText if a validator is provided and it's invalid", () => {
      render.setProps({ onChangeText: mockCallback });
      renderInstance.setState({ name: "Test", validator: "letters" })
      renderInstance.handleChangeText("123");

      expect(renderInstance.props.onChangeText).toHaveBeenCalledWith("Test", "123", false);
    });

    it("propagates null as the input value while handling onChangeText", () => {
      render.setProps({ onChangeText: mockCallback });
      renderInstance.setState({ name: "Test", validator: false })
      renderInstance.handleChangeText("");

      expect(renderInstance.props.onChangeText).toHaveBeenCalledWith("Test", null, true);
    });

    it("executes correct code on componentDidUpdate", () => {
      const prevProps = { isFocused: false };
      const spyCheckFocus = jest.spyOn(renderInstance, "checkFocus");
      render.setProps({
        isFocused: true
      });
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyCheckFocus).toHaveBeenCalled();
      spyCheckFocus.mockRestore();
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      renderInstance.setState({ propagateRef: mockCallback, name: "Test" });
      renderInstance.componentDidMount();

      expect(renderInstance.state.propagateRef).toHaveBeenCalledWith(renderInstance, "Test");
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
      renderInstance.setState({ keyboardType: false });
      const returnedType = renderInstance.getKeyboardType();

      expect(returnedType).toBe("default");
    });

    it("returns the correct keyboard type if provided", () => {
      renderInstance.setState({ keyboardType: "number-pad" });
      const returnedType = renderInstance.getKeyboardType();

      expect(returnedType).toBe("number-pad");
    });

    it("returns the ref", () => {
      const ref = { blur: mockCallback, focus: mockCallback };
      renderInstance.getRef(ref);

      expect(renderInstance.state.ref).toEqual(ref);
    });

    it("executes the propagation callback after returning the ref if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.setState({ name: "Test" });
      const ref = { blur: mockCallback, focus: mockCallback };
      renderInstance.getRef(ref);

      expect(renderInstance.props.instance).toHaveBeenCalledWith(ref, "Test");
    });

    it("returns false while executing the propagation callback after returning the ref if not provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.getRef();

      expect(renderInstance.props.instance).toHaveBeenCalled();
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

    it("triggers the help callback", () => {
      render.setProps({ help: { callback: mockCallback } });
      renderInstance.triggerHelpCallback();

      expect(renderInstance.props.help.callback).toHaveBeenCalled();
    });

    it("returns false while triggering the help callback if not provided", () => {
      renderInstance.setState({ help: { callback: undefined } });
      const res = renderInstance.triggerHelpCallback();

      expect(res).toBe(false);
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
        left: renderInstance.getStyles().icon_wrapper.offset.small
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
        right: renderInstance.getStyles().icon_wrapper.offset.small
      });
    });

    it("returns an empty object if there's no icon passed", () => {
      render.setProps({ icon: false });
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
      render.setProps({ icon: false });
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
      render.setProps({ multiline: false });
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
      renderInstance.getBoxDimensions({ width: 100, height: 100 });

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
      renderInstance.getIconWrapperDimensions({ width: 10, height: 10 });

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

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders the alternative version correctly", () => {
      expect(renderAlt).toBeDefined();
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
          icon: false
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
        message: false
      });
      const returnedElement = renderInstance.getMessage();

      expect(returnedElement).toBe(null);
    });

    it("renders a null if no message icon is provided", () => {
      render.setProps({
        message: {
          text: "Test",
          icon: false
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
      render.setProps({ icon: false });
      const returnedElement = renderInstance.getMainIcon();

      expect(returnedElement).toBe(null);
    });

    it("returns a touchable as the main icon if provided", () => {
      render.setProps({ icon: { name: "user", position: "right", callback: mockCallback } });
      let returnedElement = renderInstance.getMainIcon();
      expect(returnedElement).toBeDefined();

      renderInstance.setState({ loading: false, styling: { message: { box: {} }, header: { base: {} }, iconSize: 15, iconColor: "#FFFFFF" } });
      returnedElement = renderInstance.getMainIcon();
      expect(returnedElement).toBeDefined();
      expect(returnedElement.props.children.props.children.props.size).toBe(15);
      expect(returnedElement.props.children.props.children.props.color).toBe("#FFFFFF");
    });

    it("renders a message icon if provided", () => {
      render.setProps({
        message: {
          text: "Test",
          icon: "check"
        }
      });
      let returnedElement = renderInstance.getMessageIcon();
      expect(returnedElement).toBeDefined();

      renderInstance.setState({ styling: { message: { iconSize: 15, iconColor: "#FFFFFF" }, header: {}, help: {} } });
      returnedElement = renderInstance.getMessageIcon();
      expect(returnedElement).toBeDefined();
    });
  });
});
import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import * as UTIL from "../utils";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";
import PackenUiLoaderButton from "./PackenUiLoaderButton";

interface StylingPropShape {
  header: {
    base: object;
    label: object;
  };
  help: {
    touchable: object;
    text: object;
  };
  box: object;
  input: object;
  message: {
    box: object;
    icon: object;
    iconSize: number | undefined;
    iconColor: string | undefined;
    text: object;
  };
  loader: {
    shape: object;
    shapeContent: object;
    label: object;
    iconWrapper: object;
    iconSize: number | undefined;
    iconColor: string | undefined;
  };
  iconWrapper: object;
  icon: object;
  iconSize: number | undefined;
  iconColor: string | undefined;
}

interface EventHandlersShape {
  onFocus?: Function;
  onBlur?: Function;
  onSubmitEditing?: Function;
}

interface HelpShape {
  callback: Function;
  touchable: object;
  text: string;
}

interface IconShape {
  callback: VoidFunction;
  position: string;
  name: string;
  style: object;
}

interface MessageShape {
  icon: string;
  text: string;
}

interface PackenUiInputProps {
  disabled?: boolean;
  icon?: IconShape;
  size: string;
  theme: string;
  multiline?: boolean;
  name: string | number;
  nonEditable?: boolean;
  isDropdown?: boolean;
  isOpen?: boolean;
  help?: string | HelpShape;
  message?: MessageShape;
  keyboardType?: string;
  isFocused?: boolean;
  isPassword?: boolean;
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  maxLength?: number;
  minLength?: number;
  onChangeText: Function | boolean;
  eventHandlers?: EventHandlersShape;
  textAlign?: "left" | "center" | "right";
  propagateRef?: Function;
  loading?: boolean;
  validator?: string | boolean;
  style: object;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiInputState {
  state: string,
  icon: IconShape | boolean,
  size: string,
  theme: string,
  multiline: boolean,
  name: string,
  disabled: boolean,
  nonEditable: boolean,
  isDropdown: boolean,
  isOpen: boolean,
  help: HelpShape | string | undefined,
  message: MessageShape | boolean,
  keyboardType: string,
  isFocused: boolean,
  isPassword: boolean,
  label: string,
  placeholder: string,
  placeholderTextColor: string,
  maxLength: number | undefined,
  minLength: number,
  style: object,
  onChangeText: Function,
  eventHandlers: EventHandlersShape | false,
  textAlign: string;
  propagateRef: Function | boolean,
  loading: boolean,
  validator: string | boolean,
  styling: StylingPropShape;
  dimensions: {
    box: {
      width: number;
      height: number;
    };
    iconWrapper: {
      width: number;
      height: number;
    };
  };
}

interface refShape {
  focus: Function,
  blur: Function
}

type LayoutChangeType = (event: LayoutChangeEvent) => void;
type SetIconPositionStylesType = () => object;
type HandleFocusBlurType = (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
type HandleChangeTextType = (text: string) => void;
type HandleSubmitEditingType = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
type GetRefType = (instance: TextInput | null) => boolean | void;

/**
 * Component for rendering an input with optional label, help and message elements
 */
class PackenUiInput extends Component<PackenUiInputProps, PackenUiInputState> {
  /**
   * Variable that stores the default TextInput component ref
   * @type {object|null}
   */
  ref: refShape | null = null;

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiInputProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setInitialState() }
  }

  /**
   * Propagates the component instance if a callback is provided via props
   * @type {function}
   */
  componentDidMount() {
    if (typeof this.state.propagateRef === "function") {
      this.state.propagateRef(this, this.state.name);
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [state="default"] The current inner status of the component
   * @property {object} [icon={}] The configuration object for the icon element
   * @property {string} [size="medium"] The size of the component for applying correct styles - "tiny"; "small"; "medium"; "large"; "giant"
   * @property {string} [theme="default"] The theme of the component for applying correct styles - "default"; "danger"; "success"; "primary"; "list"
   * @property {boolean} [multiline=false] Determines whether the input should actually be rendered, styled and processed as a textarea element
   * @property {string} [name=""] The identifier for this input
   * @property {boolean} [disabled=false] Determines if the input should be disabled and applies corresponding styles
   * @property {boolean} [nonEditable=false] Determines if the input should be disabled but doesn't apply any particular styles
   * @property {boolean} [isDropdown=false] Determines if the input is used as part of a {@link PackenUiDropdown} component
   * @property {boolean} [isOpen=false] When used as part of a {@link PackenUiDropdown} component, this determines if it's open or closed
   * @property {string|object} [help=undefined] The text to be used as a help label, or the configuration object if it's also a touchable text
   * @property {object} [message={}] The configuration object for the optional message element
   * @property {string} [keyboardType="default"] The keyboard type for the input
   * @property {boolean} [isFocused=false] Determiens if the input should be focused
   * @property {boolean} [isPassword=false] Determines if the input should apply the native blurring functionality for passwords
   * @property {string} [label=""] The label text to display
   * @property {string} [placeholder=""] The placeholder text for the input
   * @property {string} [placeholderTextColor=Colors.basic.gray.dft] The color for the placeholder text
   * @property {number} [maxLength=undefined] The maximum character length allowed when typing
   * @property {number} [minLength=0] The minimum character length allowed, to propagate a positive validation check
   * @property {object} [style={}] The optional styles to be applied specifically to the native TextInput component
   * @property {function} [onChangeText=mockCallback] Function to be called when the input's value changes
   * @property {object} [eventHandlers=false] Object containing the callback functions for the onSubmitEditing, onBlur and onFocus events
   * @property {string} [textAlign="left"] Text alignment - "left"; "center"; "right"
   * @property {function} [propagateRef=false] Function that propagates the component's instance to the parent component
   * @property {boolean} [loading=false] Determines if the input should render a {@link PackenUiLoaderButton} as the icon element
   * @property {string} [validator=false] The type of validation to use when typing to propagate the check
   * @property {object} [styling={ header: { base: {}, label: {} }, help: { touchable: {}, text: {} }, box: {}, input: {}, message: { box: {}, icon: {}, iconSize: undefined, iconColor: undefined, text: {} }, loader: {}, iconWrapper: {}, icon: {}, iconSize: undefined, iconColor: undefined }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): object => {
    return {
      state: this.props.disabled ? "disabled" : "default",
      icon: this.props.icon ? { ...this.props.icon } : false,
      size: this.props.size ? this.props.size : "medium",
      theme: this.props.theme ? this.props.theme : "default",
      multiline: this.props.multiline ? this.props.multiline : false,
      name: this.props.name ? this.props.name : "",
      disabled: this.props.disabled ? this.props.disabled : false,
      nonEditable: this.props.nonEditable ? this.props.nonEditable : false,
      isDropdown: this.props.isDropdown ? this.props.isDropdown : false,
      isOpen: this.props.isOpen ? this.props.isOpen : false,
      help: this.props.help ? typeof this.props.help === "string" ? this.props.help : { ...this.props.help } : undefined,
      message: this.props.message ? { ...this.props.message } : false,
      keyboardType: this.props.keyboardType ? this.props.keyboardType : "default",
      isFocused: this.props.isFocused ? this.props.isFocused : false,
      isPassword: this.props.isPassword ? this.props.isPassword : false,
      label: this.props.label ? this.props.label : "",
      placeholder: this.props.placeholder ? this.props.placeholder : "",
      placeholderTextColor: this.props.placeholderTextColor ? this.props.placeholderTextColor : this.getStyles().placeholder.color,
      maxLength: this.props.maxLength ? this.props.maxLength : undefined,
      minLength: this.props.minLength ? this.props.minLength : 0,
      style: this.props.style ? { ...this.props.style } : {},
      onChangeText: this.props.onChangeText ? this.props.onChangeText : this.mockCallback,
      eventHandlers: this.props.eventHandlers ? this.props.eventHandlers : false,
      textAlign: this.props.textAlign ? this.props.textAlign : "left",
      propagateRef: this.props.propagateRef ? this.props.propagateRef : false,
      loading: this.props.loading ? this.props.loading : false,
      validator: this.props.validator ? this.props.validator : false,
      styling: this.props.styling ? {
        ...this.props.styling,
        header: { ...this.props.styling.header },
        help: { ...this.props.styling.help },
        message: { ...this.props.styling.message }
      } : {
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
    };
  }

  /**
   * Returns the initial component state
   * @type {function}
   * @return {object} The initial state object
   */
  setInitialState: Function = (): object => {
    let initialState = {
      ...this.setPropsToState()
    };

    if (this.props.icon) {
      initialState = {
        ...initialState,
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
      }
    }

    return initialState;
  }

  /**
   * Placeholder function that does nothing
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  mockCallback: VoidFunction = (): boolean => false;

  setIconPositionStyles: SetIconPositionStylesType = (): object => {
    let positionStyles = {};

    if (typeof this.state.icon === "object") {
      const verticalOffset = (this.state.dimensions.box.height / 2) - (this.state.dimensions.iconWrapper.height / 2);
      const horizontalOffset = this.getStyles().icon_wrapper.offset[this.state.size];

      if (this.state.icon.position === "left") {
        positionStyles = {
          top: verticalOffset,
          left: horizontalOffset
        }
      } else {
        positionStyles = {
          top: verticalOffset,
          right: horizontalOffset
        }
      }
    }

    return positionStyles;
  }

  /**
   * Sets the box dimensions to the state
   * @type {function}
   * @param {number} width The width of the box
   * @param {number} height The height of the box
   */
  getBoxDimensions: LayoutChangeType = (e: LayoutChangeEvent) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        box: {
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height
        }
      }
    }, this.setIconPositionStyles);
  }

  /**
   * Sets the icon wrapper dimensions to the state
   * @type {function}
   * @param {number} width The width of the icon wrapper
   * @param {number} height The height of the icon wrapper
   */
  getIconWrapperDimensions: LayoutChangeType = (e: LayoutChangeEvent) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        iconWrapper: {
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height
        }
      }
    }, this.setIconPositionStyles);
  }

  /**
   * Returns the correct padding styles if an icon is provided
   * @type {function}
   * @return {object} The styles object
   */
  getPaddingStyles: Function = (): object => {
    let paddingStyles = {};

    if (typeof this.state.icon === "object") {
      paddingStyles = { ...this.getStyles().input.padding[this.state.icon.position][this.state.size] };
    }

    return paddingStyles;
  }

  /**
   * Returns the multiline styles if set like so
   * @type {function}
   * @return {object} The styles object
   */
  getMultilineStyles: Function = (): object => {
    let multilineStyles = {};

    if (this.state.multiline) {
      multilineStyles = {
        ...this.getStyles().textarea.base,
        ...this.getStyles().textarea.isDropdown[this.state.isDropdown.toString()].base,
        ...this.getStyles().textarea.isDropdown[this.state.isDropdown.toString()].size[this.state.size],
        ...this.getStyles().textarea.isDropdown[this.state.isDropdown.toString()].theme[this.state.theme]
      }
    }

    return multilineStyles;
  }

  /**
   * Sets the new status to the state and triggers the corresponding callbacks on focus
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  handleFocus: HandleFocusBlurType = (): boolean | void => {
    if (this.state.theme !== "list") {
      this.setState({
        state: "focus"
      }, this.addKeyboardEvents);
      if (this.state.eventHandlers && this.state.eventHandlers.onFocus) {
        this.state.eventHandlers.onFocus(this.state.name);
      }
    } else {
      return false;
    }
  }

  /**
   * Sets the new status to the state and triggers the corresponding callbacks on blur
   * @type {function}
   */
  handleBlur: HandleFocusBlurType = () => {
    this.setState({
      state: "default"
    }, this.removeKeyboardEvents);
    if (this.state.eventHandlers && this.state.eventHandlers.onBlur) {
      this.state.eventHandlers.onBlur(this.state.name);
    }
  }

  /**
   * Triggers the corresponding callbacks on submit editing
   * @type {function}
   */
  handleSubmitEditing: HandleSubmitEditingType = () => {
    this.blur();
    if (this.state.eventHandlers && this.state.eventHandlers.onSubmitEditing) {
      this.state.eventHandlers.onSubmitEditing(this.state.name);
    }
  }

  /**
   * Handles the text change event on the input and propagates the value
   * @type {function}
   * @param {string} text The current input value
   */
  handleChangeText: HandleChangeTextType = (text: string) => {
    let isValid = true;

    if (typeof this.state.validator === "string") {
      isValid =
        UTIL.validators[this.state.validator](text)
        && text !== ""
        && text.length >= this.state.minLength
        && (this.state.maxLength ? text.length <= this.state.maxLength : true);
    }

    this.state.onChangeText(this.state.name, text ? text : null, isValid);
  }

  /**
   * Sets the keyboard event listeners
   * @type {function}
   */
  addKeyboardEvents: VoidFunction = () => {
    Keyboard.addListener("keyboardDidShow", this.focus);
  }

  /**
   * Destroys the keyboard event listeners
   * @type {function}
   */
  removeKeyboardEvents: VoidFunction = () => {
    Keyboard.removeListener("keyboardDidShow", this.focus);
  }

  /**
   * Returns if the components pointer events should be disabled
   * @type {function}
   * @return {boolean} The flag determining the editable state
   */
  setEditable: Function = (): boolean => {
    let isEditable = true;

    if (this.state.disabled || this.state.nonEditable) {
      isEditable = false;
    }

    return isEditable;
  }

  /**
   * Returns the correct icon name
   * @type {function}
   * @return {string} The icon name
   */
  getIconName: Function = (): string => {
    let name = "";

    if (this.state.isDropdown) {
      if (this.state.isOpen) {
        name = "chevron-up";
      } else {
        name = "chevron-down";
      }
    } else if (typeof this.state.icon === "object") {
      name = this.state.icon.name;
    }

    return name;
  }

  /**
   * Triggers the provided callback when pressing on the help element
   * @type {function}
   */
  triggerHelpCallback: Function = (): boolean | void => {
    if (typeof this.state.help === "object" && this.state.help.callback && typeof this.state.help.callback === "function") {
      this.state.help.callback();
    } else {
      return false;
    }
  }

  /**
   * Returns the help element
   * @type {function}
   * @return {node|null} JSX for the help or null
   */
  getHelp: Function = (): ReactNode | null => {
    let help = null;

    if (this.state.help) {
      if (typeof this.state.help === "string") {
        help = (
          <PackenUiText
            style={{
              ...this.getStyles().help.base,
              ...this.getStyles().help.size[this.state.size],
              ...this.state.styling.help.text
            }}
          >{this.state.help}</PackenUiText>
        );
      } else if (this.state.help.touchable) {
        help = (
          <PackenUiText
            touchable={{
              style: {
                label: {
                  color: Colors.brand.secondary.dft,
                  textDecorationLine: "underline",
                  ...this.state.styling.help.text
                },
                wrapper: {
                  ...this.state.styling.help.touchable
                }
              },
              callback: this.triggerHelpCallback
            }}
            style={{
              ...this.getStyles().help.base,
              ...this.getStyles().help.size[this.state.size],
              ...this.state.styling.help.text
            }}
          >{this.state.help.text}</PackenUiText>
        );
      }
    }

    return help;
  }

  /**
   * Returns the message icon element
   * @type {function}
   * @return {node|null} JSX for the message icon or null
   */
  getMessageIcon: Function = (): ReactNode | null => {
    let icon = null;

    if (typeof this.state.message === "object" && this.state.message.icon) {
      icon = (
        <Icon
          name={this.state.message.icon}
          size={this.state.styling.message.iconSize ? this.state.styling.message.iconSize : this.getStyles().message.icon.size[this.state.size].size}
          color={this.state.styling.message.iconColor ? this.state.styling.message.iconColor : this.getStyles().message.icon.theme[this.state.theme].color}
          style={{
            ...this.getStyles().message.icon.base,
            ...this.getStyles().message.icon.state[this.state.state],
            ...this.state.styling.message.icon
          }}
        />
      );
    }

    return icon;
  }

  /**
   * Returns the message element
   * @type {function}
   * @return {node|null} JSX for the message or null
   */
  getMessage: Function = (): ReactNode | null => {
    let message = null;

    if (typeof this.state.message === "object") {
      message = (
        <View style={{ ...this.getStyles().message.box, ...this.state.styling.message.box }}>
          {this.getMessageIcon()}
          <PackenUiText style={{
            ...this.getStyles().message.text.base,
            ...this.getStyles().message.text.size[this.state.size],
            ...this.getStyles().message.text.theme[this.state.theme],
            ...this.getStyles().message.text.state[this.state.state],
            ...this.state.styling.message.text
          }}>{this.state.message.text}</PackenUiText>
        </View>
      );
    }

    return message;
  }

  /**
   * Returns the provided keyboard type
   * @type {function}
   * @return {string} The keyboard type
   */
  getKeyboardType: Function = (): string => {
    return this.state.keyboardType ? this.state.keyboardType : "default";
  }

  /**
   * Sets the native TextInput ref/instance to the state
   * @type {function}
   * @param {object} input The received ref/instance
   */
  getRef: GetRefType = (input: TextInput | null): boolean | void => {
    if (!this.ref) {
      this.ref = input;
      this.checkFocus();
      if (typeof this.props.instance === "function") {
        this.props.instance(input, this.state.name);
      } else { return false; }
    }
  }

  /**
   * Focuses the input
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  focus: VoidFunction = (): boolean | void => {
    // Weird bug, if timeout is not set the focus function doesn't do anything
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      if (this.ref) { this.ref.focus(); }
    }, 250);
  }

  /**
   * Blurs the input
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  blur: VoidFunction = (): boolean | void => {
    if (this.ref) {
      this.ref.blur();
    } else { return false; }
  }

  /**
   * Determines if the input should be focused or blurred
   * @type {function}
   */
  checkFocus: VoidFunction = () => {
    if (this.state.isFocused) {
      this.focus();
    }
  }

  /**
   * Returns the icon wrapper element
   * @type {function}
   * @param {node} child The child element to wrap around
   * @return {node} JSX for the icon wrapper
   */
  getIconWrapper: Function = (child: ReactNode): ReactNode => {
    return (
      <View
        style={{
          ...this.getStyles().icon_wrapper.base,
          ...this.setIconPositionStyles(),
          ...this.state.styling.iconWrapper
        }}
        onLayout={this.getIconWrapperDimensions}
      >
        {child}
      </View>
    );
  }

  /**
   * Returns the main icon element
   * @type {function}
   * @return {node} JSX for the main icon
   */
  getMainIcon: Function = (): ReactNode | null => {
    let icon = null;

    if (typeof this.state.icon === "object") {
      const inner = !this.state.loading ? (
        <Icon
          name={this.getIconName()}
          size={this.state.styling.iconSize ? this.state.styling.iconSize : this.getStyles().icon.size[this.state.size].size}
          color={this.state.styling.iconColor ? this.state.styling.iconColor : this.getStyles().icon.base.color}
          style={{
            ...this.getStyles().icon.theme[this.state.theme],
            ...this.getStyles().icon.state[this.state.state],
            ...this.state.icon.style,
            ...this.state.styling.icon
          }}
        />
      ) : (
          <PackenUiLoaderButton
            type="icon"
            level="ghost"
            size="tiny"
            isDone={false}
            callback={this.mockCallback}
            styling={this.state.styling.loader}
          />
        );

      if (typeof this.state.icon === "object" && this.state.icon.callback) {
        icon = this.getIconWrapper((
          <TouchableWithoutFeedback onPress={this.state.icon.callback}>
            {inner}
          </TouchableWithoutFeedback>
        ));
      } else {
        icon = this.getIconWrapper(inner);
      }
    }

    return icon;
  }

  clear = () => { this.ref.clear(); }

  /**
   * Updates the state with new props and checks if it's now focused
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({
      ...this.setPropsToState()
    }, this.checkFocus);
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiInputProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  getPointerEvents = () => {
    if (this.state.state === "disabled" || this.state.nonEditable) { return "none"; }
    return "auto";
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View style={this.getStyles().container} pointerEvents={this.getPointerEvents()}>
        <View style={{
          ...this.getStyles().header.base,
          ...this.getStyles().header.theme[this.state.theme],
          ...this.state.styling.header.base
        }}>
          <PackenUiText style={{
            ...this.getStyles().label.base,
            ...this.getStyles().label.size[this.state.size],
            ...this.getStyles().label.state[this.state.state],
            ...this.state.styling.header.label
          }}>{this.state.label.toUpperCase()}</PackenUiText>
          {this.getHelp()}
        </View>
        <View style={{
          ...this.getStyles().box.base,
          ...this.getStyles().box.theme[this.state.theme],
          ...this.state.styling.box
        }} onLayout={this.getBoxDimensions}>
          {this.getMainIcon()}
          <TextInput
            style={{
              ...this.getStyles().input.base,
              ...this.getStyles().input.size[this.state.size],
              ...this.getStyles().input.theme[this.state.theme],
              ...this.getStyles().input.state[this.state.state],
              ...this.getPaddingStyles(),
              ...this.getMultilineStyles(),
              ...this.state.style,
              ...this.state.styling.input
            }}
            ref={this.getRef}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            editable={this.setEditable()}
            maxLength={this.state.maxLength}
            // @ts-ignore
            // Property textAlign is missing from react-native's index.d.ts file but the implementation here is correct
            textAlign={this.state.textAlign}
            onChangeText={this.handleChangeText}
            keyboardType={this.getKeyboardType()}
            secureTextEntry={this.state.isPassword}
            onSubmitEditing={this.handleSubmitEditing}
            placeholder={String(this.state.placeholder)}
            multiline={this.state.multiline ? true : false}
            placeholderTextColor={String(this.state.placeholderTextColor)}
          />
        </View>
        {this.getMessage()}
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    const heights = {
      tiny: 32,
      small: 40,
      medium: 48,
      large: 56,
      giant: 72
    };
    return {
      container: {
        marginTop: 3,
        marginBottom: 12
      },
      header: {
        base: {
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between"
        },
        theme: {
          default: {},
          danger: {},
          success: {},
          primary: {},
          list: {
            display: "none"
          }
        }
      },
      label: {
        base: {
          letterSpacing: 1,
          fontFamily: Typography.family.bold,
          color: Colors.basic.independence.dft
        },
        size: {
          tiny: {
            fontSize: Typography.size.tiny,
            lineHeight: Typography.lineheight.tiny
          },
          small: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small
          },
          medium: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.medium
          },
          large: {
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.medium
          },
          giant: {
            fontSize: Typography.size.large,
            lineHeight: Typography.lineheight.large
          }
        },
        state: {
          default: {},
          focus: {},
          disabled: {
            color: Colors.basic.gray.dft
          }
        }
      },
      help: {
        base: {
          textAlign: "right",
          color: Colors.basic.gray.dft
        },
        size: {
          tiny: {
            fontSize: Typography.size.xtiny,
            lineHeight: Typography.lineheight.xtiny
          },
          small: {
            fontSize: Typography.size.tiny,
            lineHeight: Typography.lineheight.tiny
          },
          medium: {
            fontSize: Typography.size.tiny,
            lineHeight: Typography.lineheight.small
          },
          large: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small
          },
          giant: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small
          }
        }
      },
      box: {
        base: {
          marginTop: 5
        },
        theme: {
          default: {},
          danger: {},
          success: {},
          primary: {},
          list: {
            marginTop: -8,
            marginBottom: -12
          }
        }
      },
      icon_wrapper: {
        base: {
          position: "absolute",
          zIndex: 1
        },
        offset: {
          tiny: 11,
          small: 13,
          medium: 21,
          large: 21,
          giant: 24
        }
      },
      icon: {
        base: {
          color: Colors.basic.independence.dft,
        },
        size: {
          tiny: {
            size: Typography.size.small
          },
          small: {
            size: Typography.size.medium
          },
          medium: {
            size: Typography.size.medium
          },
          large: {
            size: Typography.size.medium
          },
          giant: {
            size: Typography.size.xhuge
          },
          list: {
            size: Typography.size.medium
          }
        },
        state: {
          default: {},
          focus: {},
          disabled: {
            color: Colors.basic.gray.dft
          }
        },
        theme: {
          default: {
            color: Colors.basic.independence.dft
          },
          danger: {
            color: Colors.danger.default
          },
          success: {
            color: Colors.success.default
          },
          primary: {
            color: Colors.brand.primary.drk
          },
          list: {
            marginTop: 12,
            marginRight: -15,
            transform: [{ translateX: 10 }],
            color: Colors.brand.primary.drk
          }
        }
      },
      placeholder: {
        color: Colors.basic.gray.dft
      },
      input: {
        base: {
          padding: 0,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Colors.basic.independence.drk,
          backgroundColor: Colors.basic.white.dft,
          color: Colors.basic.independence.drk,
          fontFamily: Typography.family.regular
        },
        size: {
          tiny: {
            paddingHorizontal: 8,
            height: heights.tiny,
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small
          },
          small: {
            paddingHorizontal: 16,
            height: heights.small,
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.medium_alt
          },
          medium: {
            paddingHorizontal: 16,
            height: heights.medium,
            fontSize: Typography.size.large,
            lineHeight: Typography.lineheight.large
          },
          large: {
            paddingHorizontal: 16,
            height: heights.large,
            fontSize: Typography.size.large,
            lineHeight: Typography.lineheight.large
          },
          giant: {
            paddingHorizontal: 16,
            height: heights.giant,
            fontSize: Typography.size.giant_alt,
            lineHeight: Typography.lineheight.huge
          }
        },
        theme: {
          default: {
            borderColor: Colors.basic.independence.drk
          },
          danger: {
            borderColor: Colors.danger.default,
            borderWidth: 2
          },
          success: {
            borderColor: Colors.success.default,
            borderWidth: 2
          },
          primary: {
            borderColor: Colors.brand.primary.drk,
            borderWidth: 2
          },
          list: {
            height: "auto",
            borderWidth: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            backgroundColor: "transparent"
          }
        },
        state: {
          default: {},
          focus: {
            borderWidth: 2
          },
          disabled: {
            borderColor: Colors.basic.gray.lgt,
            backgroundColor: Colors.basic.white.drk
          }
        },
        padding: {
          left: {
            tiny: {
              paddingLeft: 32
            },
            small: {
              paddingLeft: 40
            },
            medium: {
              paddingLeft: 48
            },
            large: {
              paddingLeft: 48
            },
            giant: {
              paddingLeft: 62
            }
          },
          right: {
            tiny: {
              paddingRight: 32
            },
            small: {
              paddingRight: 40
            },
            medium: {
              paddingRight: 48
            },
            large: {
              paddingRight: 48
            },
            giant: {
              paddingRight: 62
            }
          }
        }
      },
      textarea: {
        base: {
          paddingVertical: 8,
          paddingHorizontal: 16
        },
        isDropdown: {
          true: {
            base: {
              textAlignVertical: "center"
            },
            size: {
              tiny: {
                height: heights.tiny
              },
              small: {
                height: heights.small
              },
              medium: {
                height: heights.medium
              },
              large: {
                height: heights.large
              },
              giant: {
                height: heights.giant
              }
            },
            theme: {
              default: {},
              danger: {},
              success: {},
              primary: {},
              list: {}
            }
          },
          false: {
            base: {
              textAlignVertical: "top"
            },
            size: {
              tiny: {
                height: 60
              },
              small: {
                height: 104
              },
              medium: {
                height: 104
              },
              large: {
                height: 104
              },
              giant: {
                height: 104
              }
            },
            theme: {
              default: {},
              danger: {},
              success: {},
              primary: {},
              list: {
                paddingLeft: 0,
                paddingRight: 0,
                height: 150
              }
            }
          }
        }
      },
      message: {
        box: {
          width: "100%",
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start"
        },
        icon: {
          base: {
            marginRight: 5
          },
          size: {
            tiny: {
              size: Typography.size.tiny
            },
            small: {
              size: Typography.size.small
            },
            medium: {
              size: Typography.size.small
            },
            large: {
              size: Typography.size.medium
            },
            giant: {
              size: Typography.size.medium
            }
          },
          theme: {
            default: {
              color: Colors.basic.gray.drk
            },
            danger: {
              color: Colors.danger.default
            },
            success: {
              color: Colors.success.default
            },
            primary: {
              color: Colors.brand.primary.drk
            },
            list: {}
          },
          state: {
            default: {},
            focus: {},
            disabled: {
              color: Colors.basic.gray.dft
            }
          }
        },
        text: {
          base: {
            flex: 1
          },
          size: {
            tiny: {
              fontSize: Typography.size.tiny
            },
            small: {
              fontSize: Typography.size.small
            },
            medium: {
              fontSize: Typography.size.small
            },
            large: {
              fontSize: Typography.size.medium
            },
            giant: {
              fontSize: Typography.size.medium
            }
          },
          theme: {
            default: {
              color: Colors.basic.gray.drk
            },
            danger: {
              color: Colors.danger.default
            },
            success: {
              color: Colors.success.default
            },
            primary: {
              color: Colors.brand.primary.drk
            },
            list: {}
          },
          state: {
            default: {},
            focus: {},
            disabled: {
              color: Colors.basic.gray.dft
            }
          }
        }
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    disabled: PropTypes.bool,
    icon: PropTypes.object,
    size: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    multiline: PropTypes.bool,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nonEditable: PropTypes.bool,
    isDropdown: PropTypes.bool,
    isOpen: PropTypes.bool,
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    message: PropTypes.object,
    keyboardType: PropTypes.string,
    isFocused: PropTypes.bool,
    isPassword: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    onChangeText: PropTypes.func.isRequired,
    eventHandlers: PropTypes.object,
    textAlign: PropTypes.string,
    propagateRef: PropTypes.func,
    loading: PropTypes.bool,
    validator: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiInput;
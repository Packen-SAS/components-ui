import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiInput from "./PackenUiInput";
import PackenUiDropdown from "./PackenUiDropdown";
import PackenUiText from "./PackenUiText";

/**
 * Component for rendering a {@link PackenUiList}'s item, so it should not be used standalone
 */
class PackenUiListItem extends Component {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);
    
    /**
     * Variable that stores the {@link PackenUiDropdown}'s ref/instance if configured like so
     * @type {object}
     */
    this.dropdownRef = null;
    
    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
  }

  /**
   * Propagates the component instance if a callback is provided via props
   * @type {function}
   */
  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {object} data The object that groups all configurations for this item
   * @property {object} [data.input=false] The configuration for the optional inner {@link PackenUiInput} component
   * @property {string} [data.size="default"] The size for the item styles - "default" or "large"
   * @property {string} [data.title=""] The main label for simple items that just render text
   * @property {string} [data.subtitle=false] The optional sub label for simple items that just render text
   * @property {string} [data.label=false] The optional text to display to the right of the box
   * @property {object} [data.icon=false] The configuration object for the optional icon displayed on the right of the box
   * @property {node} [data.media=false] The optional JSX content to display to the left of the box
   * @property {function} [data.callback=false] The optional callback to be triggered when pressing on this specific item
   * @property {object} [data.customWrapperStyle={}] The optional styles to be applied specifically to the wrapper element
   * @property {object} [styling={ wrapper: {}, media: {}, main: {}, sub: {}, title: {}, subtitle: {}, dropdown: {}, input: {}, label: {}, iconWrapper: {}, iconSize: undefined, iconColor: undefined }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      data: {
        input: this.props.data.input ? { ...this.props.data.input } : false,
        size: this.props.data.size ? this.props.data.size : "default",
        title: this.props.data.title ? this.props.data.title : "",
        subtitle: this.props.data.subtitle ? this.props.data.subtitle : false,
        label: this.props.data.label ? this.props.data.label : false,
        icon: this.props.data.icon ? { ...this.props.data.icon } : false,
        media: this.props.data.media ? this.props.data.media : false,
        callback: this.props.data.callback ? this.props.data.callback : false,
        customWrapperStyle: this.props.data.customWrapperStyle ? this.props.data.customWrapperStyle : {}
      },
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        media: {},
        main: {},
        sub: {},
        title: {},
        subtitle: {},
        dropdown: {},
        input: {},
        label: {},
        iconWrapper: {},
        iconSize: undefined,
        iconColor: undefined
      }
    };
  }

  /**
   * Triggers the callback if provided
   * @type {function}
   */
  onPressHandler = () => {
    if (this.state.data.callback) {
      this.state.data.callback();
    } else {
      return false;
    }
  }

  /**
   * Handles when the optional inner {@link PackenUiDropdown} component opens/closes to set its details to the state for correct styling
   * @type {function}
   * @param {boolean} newState Determines if the dropdown is open or closed
   * @param {number} height The dropdown height
   */
  onOpenStateChangeHandler = (newState, height) => {
    this.setState({
      data: {
        ...this.state.data,
        input: {
          ...this.state.data.input,
          isOpen: newState,
          dropdownHeight: height
        }
      }
    });
  }

  /**
   * Returns the media element
   * @type {function}
   * @return {node|null} JSX for the media
   */
  getMedia = () => {
    let media = null;

    if (this.state.data.media) {
      media = (
        <View style={{ ...this.getStyles().media, ...this.state.styling.media }}>
          {this.state.data.media}
        </View>
      );
    }

    return media;
  }

  /**
   * Handles the change event on the optional inner {@link PackenUiInput} component to trigger its original callback
   * @type {function}
   * @param {string} name The identifier for the input
   * @param {string} val The new value
   */
  inputChangeHandler = (name, val) => {
    if (this.state.data.input.onChange) {
      this.state.data.input.onChange(name, val);
    } else {
      return false;
    }
  }

  /**
   * Returns the main wrapping element
   * @type {function}
   * @param {node} children The children elements to wrap
   * @return {node} JSX for the main wrapper and its content
   */
  getMainWrapper = children => {
    return (
      <View style={{ ...this.getStyles().main, ...this.state.styling.main }}>
        {children}
        {
          this.state.data.subtitle ? (
            <PackenUiText style={{
              color: "rgba(48, 77, 109, 0.4)",
              transform: [
                { translateY: this.state.data.input && this.state.data.input.isOpen ? -this.state.data.input.dropdownHeight : 0 }
              ],
              ...this.state.styling.subtitle
            }} preset="c1">{this.state.data.subtitle}</PackenUiText>
          ) : null
        }
      </View>
    );
  }

  /**
   * Returns the correct placeholder configuration for the optional inner {@link PackenUiInput} either as a standalone component or as part of the also optional {@link PackenUiDropdown}, depending on its current value
   * @type {function}
   * @return {object} The configuration object
   */
  getPlaceholder = () => {
    let config = {
      val: this.state.data.input.placeholder,
      color: Colors.basic.gray.dft
    };

    if (this.state.data.input.value !== "") {
      config = {
        val: this.state.data.input.value,
        color: Colors.basic.independence.drk
      };
    }

    return config;
  }

  /**
   * Sets the {@link PackenUiDropdown} instance to the global variable
   * @type {function}
   * @param {object} ref The instance object
   */
  getDropdownRef = ref => { this.dropdownRef = ref; }

  /**
   * Toggles the optional inner {@link PackenUiDropdown} on press
   * @type {function}
   */
  toggleDropdown = () => {
    if (this.dropdownRef) {
      this.dropdownRef.toggleMenu();
    }
  }

  /**
   * Determines which type of input content should be rendered as part of the main elements
   * @type {function}
   * @return {node|null} JSX for the correct input element or null
   */
  determineInputContent = () => {
    let content = null;
    if (this.state.data.input.isDropdown) {
      content = (
        <PackenUiDropdown
          size="medium"
          ref={this.getDropdownRef}
          name={this.state.data.input.name}
          list={this.state.data.input.list}
          callback={this.inputChangeHandler}
          styling={this.state.styling.dropdown}
          input={{
            theme: "list",
            size: "medium",
            onChangeText: false,
            onOpenStateChange: this.onOpenStateChangeHandler,
            style: {
              paddingHorizontal: 24,
              marginHorizontal: -24,
              paddingVertical: 15,
              marginVertical: -15
            },
            placeholder: this.getPlaceholder().val,
            placeholderTextColor: this.getPlaceholder().color,
            nonEditable: this.state.data.input.nonEditable,
            isOpen: this.state.data.input.isOpen,
            icon: { position: "right" }
          }}
        />
      );
    } else {
      content = (
        <PackenUiInput
          theme="list"
          size="medium"
          name={this.state.data.input.name}
          style={{ marginVertical: -5 }}
          keyboardType={this.state.data.input.keyboardType}
          onChangeText={this.inputChangeHandler}
          placeholder={this.getPlaceholder().val}
          placeholderTextColor={this.getPlaceholder().color}
          nonEditable={this.state.data.input.nonEditable}
          multiline={this.state.data.input.multiline}
          maxLength={this.state.data.input.maxLength}
          styling={this.state.styling.input}
        />
      )
    }
    return content;
  }

  /**
   * Returns the wrapped main content
   * @type {function}
   * @return {node|null} JSX for the wrapped main content or null
   */
  getMainContent = () => {
    let content = null;

    if (this.state.data.input) {
      content = this.determineInputContent();
    } else {
      content = (
        <PackenUiText preset="p1" styling={this.state.styling.title}>{this.state.data.title}</PackenUiText>
      );
    }

    return this.getMainWrapper(content);
  }

  /**
   * Returns the secondary content
   * @type {function}
   * @return {node|null} JSX for the secondary content or null
   */
  getSubContent = () => {
    return (
      <View style={{ ...this.getStyles().sub, ...this.state.styling.sub }}>
        {
          this.state.data.label ? (
            <PackenUiText style={{
              color: this.state.data.label.color,
              ...this.state.styling.label
            }} preset="c1">{this.state.data.label.text}</PackenUiText>
          ) : null
        }
        {
          this.state.data.icon ? (
            <View style={{
              ...this.getStyles().icon,
              ...this.state.styling.iconWrapper
            }}>
              <Icon
                name={this.state.data.icon.name}
                size={this.state.styling.iconSize ? this.state.styling.iconSize : 14}
                color={this.state.styling.iconColor ? this.state.styling.iconColor : this.state.data.icon.color} />
            </View>
          ) : null
        }
      </View>
    )
  }

  /**
   * Returns the touchable area element, which covers the whole component, to more easily toggle the optional inner {@link PackenUiDropdown} element
   * @type {function}
   * @return {node} JSX for the touchable area
   */
  getTouchableArea = () => {
    return (
      <View style={{ ...this.getStyles().touchable.area }} pointerEvents={this.state.data.input && this.state.data.input.isDropdown ? "auto" : "none"}>
        <TouchableWithoutFeedback onPress={this.toggleDropdown}>
          <View style={{ ...this.getStyles().touchable.inner }}></View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.onPressHandler}
      >
        <View style={{ ...this.state.data.customWrapperStyle }}>
          {this.getTouchableArea()}
          <View style={{
            ...this.getStyles().wrapper.base,
            ...this.getStyles().wrapper.size[this.state.data.size],
            ...this.state.styling.wrapper
          }}>
            {this.getMedia()}
            {this.getMainContent()}
            {this.getSubContent()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles = () => {
    return {
      wrapper: {
        base: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: Colors.basic.white.dft
        },
        size: {
          default: {
            minHeight: 48
          },
          large: {
            minHeight: 56
          }
        }
      },
      touchable: {
        area: {
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          maxHeight: 50,
          position: "absolute"
        },
        inner: {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "absolute"
        }
      },
      media: {
        marginRight: 15
      },
      main: {
        flex: 1
      },
      sub: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
      },
      icon: {
        marginLeft: 10
      }
    };
  }
}

PackenUiListItem.propTypes = {
  data: PropTypes.shape({
    input: PropTypes.object,
    size: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    label: PropTypes.shape({
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    }),
    icon: PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    }),
    media: PropTypes.node,
    callback: PropTypes.func,
    customWrapperStyle: PropTypes.object
  }).isRequired,
  styling: PropTypes.object
};

export default PackenUiListItem;
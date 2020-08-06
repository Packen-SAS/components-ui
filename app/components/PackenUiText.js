import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

/**
 * Component for rendering text with optional style presets, touchable callbacks, and icons
 */
class PackenUiText extends Component {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);

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
   * @property {string} [preset=false] The preset styles to apply - "h1"; "h2"; "h3"; "h4"; "h5"; "h6"; "t1"; "t2"; "s1"; "s2"; "p1"; "p2"; "c1"; "c2"; "label"
   * @property {object} [touchable=false] The configuration object for the touchable
   * @property {node} [children=null] The actual text to display
   * @property {object} [icon=false] The configuration object for the icon
   * @property {object} [presetStyle={}] The styles for the specified preset
   * @property {object} [touchableStyles={ wrapper: {}, label: {} }]  The optional custom styles for the touchable elements
   * @property {object} [styling={}] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      preset: this.props.preset ? this.props.preset : false,
      touchable: this.props.touchable ? { ...this.props.touchable } : false,
      children: this.props.children ? this.props.children : null,
      icon: this.props.icon ? { ...this.props.icon } : false,
      presetStyle: this.props.preset ? Typography[this.props.preset] : {},
      touchableStyles: this.getTouchableStyles(),
      styling: this.props.styling ? { ...this.props.styling } : {}
    };
  }

  /**
   * Returns the custom touchable styles if provided
   * @type {function}
   * @return {object} The styles object
   */
  getTouchableStyles = () => {
    let styles = {
      wrapper: {},
      label: {}
    };

    if (this.props.touchable && this.props.touchable.style) {
      styles = {
        wrapper: this.props.touchable.style.wrapper ? { ...this.props.touchable.style.wrapper } : {},
        label: this.props.touchable.style.label ? { ...this.props.touchable.style.label } : {}
      };
    }

    return styles;
  }

  /**
   * Triggers the provided touchable callback if set so
   * @type {function}
   */
  triggerCallback = () => {
    if (this.state.touchable) {
      this.state.touchable.callback();
    } else {
      return false;
    }
  }

  /**
   * Returns the correct elements depending on the provided configuration for touchables and icons
   * @type {function}
   * @return {node} JSX for the text element
   */
  getContent = () => {
    let content = (
      <Text style={{
        ...styles.base,
        ...this.state.presetStyle,
        ...this.props.style,
        ...this.props.styling,
        ...this.state.touchableStyles.label,
        ...this.state.styling
      }}>{this.state.children}</Text>
    );

    if (this.props.icon) {
      const { name, position, color, size } = this.state.icon;
      const icon = <Icon name={name} color={color} size={size} />;
      const marginStyle = position === "left" ? styles.iconLabelLeft : styles.iconLabelRight;

      content = (
        <View style={{
          ...styles.iconWrapper,
          ...this.state.touchableStyles.wrapper
        }}>
          {position === "left" ? icon : null}
          <View style={marginStyle}>{content}</View>
          {position === "right" ? icon : null}
        </View>
      );
    }

    if (this.state.touchable) {
      content = (
        <TouchableWithoutFeedback onPress={this.triggerCallback}>
          {content}
        </TouchableWithoutFeedback>
      )
    }

    return content;
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
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return this.getContent();
  }
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.medium,
    color: Colors.basic.independence.drk
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  iconLabelLeft: {
    marginLeft: 5
  },
  iconLabelRight: {
    marginRight: 5
  }
});

PackenUiText.propTypes = {
  preset: PropTypes.string,
  touchable: PropTypes.object,
  children: PropTypes.node.isRequired,
  icon: PropTypes.object,
  styling: PropTypes.object
};

export default PackenUiText;
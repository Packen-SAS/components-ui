import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";

/**
 * Component for rendering header layouts with a touchable icon on the left
 */
class PackenUiHeader extends Component {
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
   * @property {string} [children=""] The title text
   * @property {string} [icon="arrow-left"] The icon name to be displayed
   * @property {function} [onBackPress=false] The callback function to be called when pressing the icon
   * @property {object} [customStyle={}] Custom styles object to be applied specifically to the wrapping box element
   * @property {object} [styling={ box: {}, iconSize: undefined, iconColor: undefined, title: {} }] The theme of the divider - "light" or "dark"
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      children: this.props.children || "",
      icon: this.props.icon || "arrow-left",
      onBackPress: this.props.onBackPress || false,
      customStyle: this.props.style || {},
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        iconSize: undefined,
        iconColor: undefined,
        title: {}
      }
    };
  }

  /**
   * Handles the onPress event on the icon
   * @type {function}
   */
  onPressHandler = () => {
    if (this.state.onBackPress) {
      this.state.onBackPress();
    } else {
      return false;
    }
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
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
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
      <View style={{
        ...this.getStyles().box,
        ...this.state.customStyle,
        ...this.state.styling.box
      }}>
        <TouchableWithoutFeedback onPress={this.onPressHandler}>
          <Icon
            name={this.state.icon}
            size={this.state.styling.iconSize ? this.state.styling.iconSize : 20}
            color={this.state.styling.iconColor ? this.state.styling.iconColor : Colors.brand.primary.drk}
          />
        </TouchableWithoutFeedback>
        <PackenUiText preset="h6" style={{
          ...this.getStyles().title,
          ...this.state.styling.title
        }}>
          {this.state.children}
        </PackenUiText>
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles = () => {
    return {
      box: {
        width: "100%",
        padding: 20,
        paddingBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: Colors.basic.white.dft
      },
      title: {
        paddingLeft: 15,
        color: Colors.brand.primary.drk
      }
    }
  }
}

PackenUiHeader.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  onBackPress: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  customStyle: PropTypes.object,
  styling: PropTypes.object
};

export default PackenUiHeader;
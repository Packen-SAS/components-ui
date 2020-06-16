import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as UTIL from "../utils";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";

/**
 * Component for rendering a small tag element consisting of a label over a background-colored box
 */
class PackenUiTag extends Component {
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
   * @property {object} [style={}] The optional styles object to be applied specifically to the inner {@link PackenUiText} component
   * @property {object} [boxStyles={}] The optional styles object to be applied specifically to the box element
   * @property {node} [children=null] The actual text to display
   * @property {string} [backgroundColor=Colors.brand.primary.ulgt] The background color for the box
   * @property {string} [textColor=Colors.basic.independence.dft] The color for the text
   * @property {object} [styling={ box: {}, label: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      style: this.props.style ? { ...this.props.style } : {},
      boxStyles: this.props.style ? { ...this.props.style } : {},
      children: this.props.children ? this.props.children : null,
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Colors.brand.primary.ulgt,
      textColor: this.props.textColor ? this.props.textColor : Colors.basic.independence.dft,
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        label: {}
      }
    };
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
    return (
      <View style={{
        ...this.getStyles().box.base,
        ...this.state.boxStyles,
        ...this.state.styling.box
      }}>
        <PackenUiText
          preset="c1"
          style={{
            ...this.getStyles().label.base,
            ...this.state.style,
            ...this.state.styling.label
          }}
        >{this.state.children}</PackenUiText>
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
        base: {
          borderRadius: 3,
          paddingVertical: 0,
          paddingHorizontal: 7,
          textAlign: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: this.state.backgroundColor,
          alignSelf: "flex-start"
        }
      },
      label: {
        base: {
          color: this.state.textColor,
          fontFamily: Typography.family.regular,
          fontSize: Typography.size.tiny_alt,
          lineHeight: Typography.lineheight.medium_alt
        }
      }
    };
  }
}

PackenUiTag.propTypes = {
  style: PropTypes.object,
  boxStyles: PropTypes.object,
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  styling: PropTypes.object
};

export default PackenUiTag;
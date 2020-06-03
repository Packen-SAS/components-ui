import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import colors from "../styles/abstracts/colors";
import PackenUiText from "./PackenUiText";

class PackenUiBadge extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.setPropsToState() }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      label: this.props.label ? this.props.label.toString() : "",
      children: this.props.children ? this.props.children : false,
      width: this.props.width ? this.props.width : 16,
      height: this.props.height ? this.props.height : 16,
      color: this.props.color ? this.props.color : colors.basic.white.dft,
      fontSize: this.props.fontSize ? this.props.fontSize : 12,
      borderRadius: this.props.borderRadius ? this.props.borderRadius : this.props.height,
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : colors.brand.primary.drk,
      styling: this.props.styling ? { ...this.props.styling } : {
        outer: {},
        content: {},
        dotWrapper: {},
        wrapper: {},
        label: {}
      }
    };
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  getContent = () => {
    let content = (
      <View style={{ ...this.getStyle().wrapper, ...this.state.styling.wrapper }}>
        <PackenUiText preset="c2" style={{ ...this.getStyle().label, ...this.state.styling.label }}>{this.state.label}</PackenUiText>
      </View>
    );

    if (this.state.children) {
      content = (
        <View style={{ ...this.getStyle().outer, ...this.state.styling.outer }}>
          <View style={{ ...this.getStyle().content, ...this.state.styling.content }}>
            <View style={{ ...this.getStyle().dotWrapper, ...this.state.styling.dotWrapper }}>
              {content}
            </View>
            {this.state.children}
          </View>
        </View>
      );
    }

    return content;
  }

  render() {
    return this.getContent();
  }

  getStyle = () => {
    return {
      outer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start"
      },
      dotWrapper: {
        top: 0,
        right: 0,
        zIndex: 1,
        position: "absolute",
        borderRadius: this.state.borderRadius
      },
      wrapper: {
        borderRadius: this.state.borderRadius,
        width: this.state.width,
        height: this.state.height,
        backgroundColor: this.state.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      },
      label: {
        color: this.state.color,
        fontSize: this.state.fontSize
      },
      content: {}
    };
  }
}

PackenUiBadge.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  fontSize: PropTypes.number,
  borderRadius: PropTypes.number,
  backgroundColor: PropTypes.string,
  styling: PropTypes.object
};

export default PackenUiBadge;
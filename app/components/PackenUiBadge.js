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

  setPropsToState = () => {
    return {
      label: this.props.label ? this.props.label.toString() : "",
      width: this.props.width ? this.props.width : 16,
      height: this.props.height ? this.props.height : 16,
      color: this.props.color ? this.props.color : colors.basic.white.dft,
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : colors.brand.primary.drk
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

  render() {
    return (
      <View style={this.getStyle().wrapper}>
        <PackenUiText preset="c2" style={this.getStyle().label}>{this.state.label}</PackenUiText>
      </View>
    );
  }

  getStyle = () => {
    return {
      wrapper: {
        borderRadius: 100,
        width: this.state.width,
        height: this.state.height,
        backgroundColor: this.state.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      },
      label: {
        color: this.state.color
      }
    };
  }
}

PackenUiBadge.propTypes = {
  label: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  backgroundColor: PropTypes.string
};

export default PackenUiBadge;
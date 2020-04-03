import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

class PackenUiText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preset: props.preset ? Typography[this.props.preset] : {},
      touchable: this.getTouchableStyles()
    }
  }

  getTouchableStyles = () => {
    let styles = {};

    if (this.props.touchable) {
      styles = {
        color: this.props.touchable.color,
        textDecorationLine: this.props.touchable.underline ? "underline" : "none"
      };
    }

    return styles;
  }

  render() {
    return (
      <Text style={{
        ...styles.base,
        ...this.state.preset,
        ...this.props.style,
        ...this.state.touchable
      }}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.medium,
    color: Colors.basic.independence.drk
  }
});

export default PackenUiText;
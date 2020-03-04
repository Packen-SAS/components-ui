import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

class PackenText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preset: props.preset ? Typography[this.props.preset] : {}
    }
  }

  render() {
    return (
      <Text style={{
        ...styles.base,
        ...this.state.preset,
        ...this.props.style
      }}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.medium,
    color: Colors.base.default
  }
});

export default PackenText;
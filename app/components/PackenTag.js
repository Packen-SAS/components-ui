import React, { Component } from "react";
import { View } from "react-native";

import TagStyles from "../styles/components/PackenTag";

import PackenText from "./PackenText";

class PackenTag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={TagStyles.box.base}>
        <PackenText style={{ ...TagStyles.label.base, ...this.props.style }}>{this.props.children}</PackenText>
      </View>
    );
  }
}

export default PackenTag;
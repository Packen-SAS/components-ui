import React, { Component } from "react";
import { View } from "react-native";

import TagStyles from "../styles/components/PackenUiTag";

import PackenUiText from "./PackenUiText";

class PackenUiTag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={TagStyles.box.base}>
        <PackenUiText style={{ ...TagStyles.label.base, ...this.props.style }}>{this.props.children}</PackenUiText>
      </View>
    );
  }
}

export default PackenUiTag;
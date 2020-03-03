import React, { Component } from "react";

import { View } from "react-native";

import * as DividerStyles from "../styles/components/PackenDivider";

class PackenDivider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        height: this.props.size,
        marginTop: this.props.margin.top,
        marginBottom: this.props.margin.bottom,
        ...DividerStyles[this.props.type]
      }}></View>
    );
  }
}

export default PackenDivider;
import React, { Component } from "react";
import { View } from "react-native";

import RadarStyles from "../styles/components/PackenRadar";

class PackenRadar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        ...RadarStyles.wrapper.base,
        ...RadarStyles.wrapper.theme[this.props.theme]
      }}>
        <View style={{
          ...RadarStyles.dot.base,
          ...RadarStyles.dot.theme[this.props.theme]
        }}></View>
      </View>
    );
  }
}

export default PackenRadar;
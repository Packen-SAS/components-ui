import React from "react";

import { View } from "react-native";

import * as DividerStyles from "../styles/components/PackenDivider";

const PackenDivider = props => {
  const { size, margin, type } = props;

  return (
    <View style={{
      height: size,
      marginTop: margin.top,
      marginBottom: margin.bottom,
      ...DividerStyles[type]
    }}></View>
  );
}

export default PackenDivider;
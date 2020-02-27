import React from "react";
import { StyleSheet, Text } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

const PackenText = props => {
  
  return (
    <Text style={{
      ...styles.base,
      ...props.style
    }}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.medium,
    color: Colors.base.default
  }
});

export default PackenText;
import React, { Component } from "react";
import { View } from "react-native";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";

class PackenUiTag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.getStyles().box.base}>
        <PackenUiText style={{ ...this.getStyles().label.base, ...this.props.style }}>{this.props.children}</PackenUiText>
      </View>
    );
  }

  getStyles = () => {
    return {
      box: {
        base: {
          borderRadius: 3,
          paddingVertical: 2,
          paddingHorizontal: 8,
          textAlign: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.basic.white.drk,
          alignSelf: "flex-start"
        }
      },
      label: {
        base: {
          fontFamily: Typography.family.bold,
          fontSize: Typography.size.tiny_alt,
          lineHeight: Typography.lineheight.medium_alt
        }
      }
    };
  }
}

export default PackenUiTag;
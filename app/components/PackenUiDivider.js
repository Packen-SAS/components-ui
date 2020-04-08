import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";

class PackenUiDivider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{
        height: this.props.size,
        marginTop: this.props.margin ? this.props.margin.top : 0,
        marginBottom: this.props.margin ? this.props.margin.bottom : 0,
        ...this.getStyles().base,
        ...this.getStyles().type[this.props.type]
      }}></View>
    );
  }

  getStyles = () => {
    return {
      base: {
        width: "100%",
        alignItems: "stretch"
      },
      type: {
        light: {
          backgroundColor: Colors.secondary.focus
        },
        dark: {
          backgroundColor: Colors.base.gray
        }
      }
    };
  }
}

export default PackenUiDivider;
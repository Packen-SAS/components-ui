import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";

class PackenUiDivider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      size: props.size,
      margin: {...props.margin}
    }
  }

  updateState = () => {
    this.setState({
      type: this.props.type,
      size: this.props.size,
      margin: {...this.props.margin}
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={{
        height: this.state.size,
        marginTop: this.state.margin ? this.state.margin.top : 0,
        marginBottom: this.state.margin ? this.state.margin.bottom : 0,
        ...this.getStyles().base,
        ...this.getStyles().type[this.state.type]
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
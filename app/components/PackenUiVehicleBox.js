import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";
import PackenUiTag from "./PackenUiTag";

class PackenUiVehicleBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      make: props.make,
      year: props.year,
      plate: props.plate,
      img: { ...props.img },
      callback: props.callback
    }
  }

  updateState = () => {
    this.setState({
      type: this.props.type,
      make: this.props.make,
      year: this.props.year,
      plate: this.props.plate,
      img: { ...this.props.img },
      callback: this.props.callback
    });
  }

  getContent = () => {
    let content = (
      <View style={this.getStyles().box}>
        <Image source={this.state.img.src} style={this.getStyles().img} />
        <View style={this.getStyles().copy}>
          <PackenUiText preset="s2" style={this.getStyles().text}>{this.state.type} {this.state.make}</PackenUiText>
          <View style={this.getStyles().subtitle}>
            <View style={{ marginRight: 8 }}>
              <PackenUiText preset="s2" style={this.getStyles().text}>{this.state.year}</PackenUiText>
            </View>
            <PackenUiTag><PackenUiText preset="s2" style={this.getStyles().plate}>{this.state.plate.toUpperCase()}</PackenUiText></PackenUiTag>
          </View>
        </View>
      </View>
    );

    if (this.state.callback) {
      content = (
        <TouchableWithoutFeedback onPress={this.state.callback}>
          {content}
        </TouchableWithoutFeedback>
      );
    }

    return content;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return this.getContent();
  }

  getStyles = () => {
    return {
      box: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.basic.white.dft
      },
      img: {
        width: this.state.img.width,
        height: this.state.img.height
      },
      copy: {
        flex: 1,
        marginLeft: 24
      },
      subtitle: {
        flexDirection: "row",
        alignItems: "center"
      },
      text: {
        fontFamily: Typography.family.regular,
        color: Colors.basic.gray.drk
      },
      plate: {
        fontFamily: Typography.family.regular,
        color: Colors.basic.independence.drk
      }
    };
  }
}

export default PackenUiVehicleBox;
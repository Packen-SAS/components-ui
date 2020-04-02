import React, { Component } from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import MapPinStyles from "../styles/components/PackenUiMapPin";
import PackenUiText from "./PackenUiText";

class PackenUiMapPinSub extends Component {
  constructor(props) {
    super(props);
  }

  getIconColor = () => {
    let color = MapPinStyles.icon.type.icon.color;

    if (this.props.theme) {
      color = MapPinStyles.icon.theme[this.props.theme].color;
    }

    return color;
  }

  getIcon = () => {
    let icon = null;

    if (this.props.icon) {
      icon = (
        <Icon
          name={this.props.icon}
          color={this.getIconColor()}
          size={MapPinStyles.icon.type.icon.fontSize}
        />
      );
    }

    return icon;
  }

  getLabel = () => {
    let label = null;

    if (this.props.label) {
      label = (
        <PackenUiText
          style={{
            ...MapPinStyles.character.base,
            ...MapPinStyles.character.theme[this.props.theme]
          }}
        >
          {this.props.label.toUpperCase()}
        </PackenUiText>
      );
    }

    return label;
  }

  getDot = () => {
    let dot = null;

    if (this.props.dotPosition) {
      dot = (
        <View
          style={{
            ...MapPinStyles.dot.base,
            ...MapPinStyles.dot.positioning.type[this.props.type][this.props.dotPosition]
          }}
        ></View>
      );
    }

    return dot;
  }

  render() {
    return (
      <View
        style={{
          ...MapPinStyles.sub.base,
          ...MapPinStyles.sub.type[this.props.type],
          ...MapPinStyles.sub.theme[this.props.theme]
        }}
      >
        {this.getIcon()}
        {this.getLabel()}
        {this.getDot()}
      </View>
    );
  }
}

export default PackenUiMapPinSub;
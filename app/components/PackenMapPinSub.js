import React, { Component } from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import MapPinStyles from "../styles/components/PackenMapPin";
import PackenText from "./PackenText";

class PackenMapPinSub extends Component {
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

  render() {
    return (
      <View style={{ ...MapPinStyles.sub.base, ...MapPinStyles.sub.type[this.props.type], ...MapPinStyles.sub.theme[this.props.theme] }}>
        {
          this.props.icon ? (
            <Icon
              name={this.props.icon}
              color={this.getIconColor()}
              size={MapPinStyles.icon.type.icon.fontSize} />
          ) : null
        }
        {
          this.props.label ? (
            <PackenText style={{ ...MapPinStyles.character.base, ...MapPinStyles.character.theme[this.props.theme] }}>{this.props.label.toUpperCase()}</PackenText>
          ) : null
        }
        {
          this.props.dotPosition ? (
            <View style={{ ...MapPinStyles.dot.base, ...MapPinStyles.dot.positioning.type[this.props.type][this.props.dotPosition] }}></View>
          ) : null
        }
      </View>
    );
  }
}

export default PackenMapPinSub;
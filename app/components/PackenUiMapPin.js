import React, { Component } from "react";
import { View } from "react-native";

import MapPinStyles from "../styles/components/PackenUiMapPin";
import PackenUiMapPinSub from "./PackenUiMapPinSub";
import PackenUiText from "./PackenUiText";

class PackenUiMapPin extends Component {
  constructor(props) {
    super(props);
  }

  getLabel = () => {
    if (this.props.main.label) {
      return <PackenUiText style={{ ...MapPinStyles.label.base, ...MapPinStyles.label.theme[this.props.theme] }}>{this.props.main.label.toUpperCase() + " "}</PackenUiText>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={MapPinStyles.container}>
        {
          this.props.type === "info" ? (
            <View style={MapPinStyles.inner}>
              {
                this.props.sub && this.props.sub.position === "left" ? (
                  <PackenUiMapPinSub type={this.props.type} theme={this.props.theme} label={this.props.sub.character} icon={this.props.sub.icon} dotPosition={this.props.dotPosition} />
                ) : null
              }
              <View style={{ ...MapPinStyles.main.base, ...MapPinStyles.main.theme[this.props.theme] }}>
                <PackenUiText style={{ ...MapPinStyles.text.base, ...MapPinStyles.text.theme[this.props.theme] }}>
                  {this.getLabel()}
                  {this.props.main.text}
                </PackenUiText>
              </View>
              {
                this.props.sub && this.props.sub.position === "right" ? (
                  <PackenUiMapPinSub type={this.props.type} theme={this.props.theme} label={this.props.sub.character} icon={this.props.sub.icon} dotPosition={this.props.dotPosition} />
                ) : null
              }
            </View>
          ) : (
              <PackenUiMapPinSub type={this.props.type} theme={this.props.theme} label={this.props.sub.character} icon={this.props.sub.icon} dotPosition={this.props.dotPosition} />
            )
        }
      </View>
    );
  }
}

export default PackenUiMapPin;
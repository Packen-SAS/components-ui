import React, { Component } from "react";
import { View } from "react-native";

import MapPinStyles from "../styles/components/PackenMapPin";
import PackenMapPinSub from "./PackenMapPinSub";
import PackenText from "./PackenText";

class PackenMapPin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={MapPinStyles.container}>
        {
          this.props.type === "info" ? (
            <View style={MapPinStyles.inner}>
              {
                this.props.sub.position === "left" ? (
                  <PackenMapPinSub type={this.props.type} theme={this.props.theme} label={this.props.sub.character} icon={this.props.sub.icon} dotPosition={this.props.dotPosition}/>
                ) : null
              }
              <View style={{ ...MapPinStyles.main.base, ...MapPinStyles.main.theme[this.props.theme] }}>
                <PackenText style={{ ...MapPinStyles.text.base, ...MapPinStyles.text.theme[this.props.theme] }}>
                  {
                    this.props.main.label ? (
                      <PackenText style={{ ...MapPinStyles.label.base, ...MapPinStyles.label.theme[this.props.theme] }}>{this.props.main.label.toUpperCase() + " "}</PackenText>
                    ) : null
                  }
                  { this.props.main.text }
                </PackenText>
              </View>
              {
                this.props.sub.position === "right" ? (
                  <PackenMapPinSub type={this.props.type} theme={this.props.theme} label={this.props.sub.character} icon={this.props.sub.icon} dotPosition={this.props.dotPosition}/>
                ) : null
              }
            </View>
          ) : (
            <PackenMapPinSub type={this.props.type} theme={this.props.theme} label={this.props.sub.character} icon={this.props.sub.icon} dotPosition={this.props.dotPosition}/>
          )
        }
      </View>
    );
  }
}

export default PackenMapPin;
import React, { Component } from "react";

import { View, Image } from "react-native";

import * as AvatarStyles from "../styles/components/PackenUiAvatar";

class PackenUiAvatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={AvatarStyles.container[this.props.size]}>
        <Image source={this.props.src} style={{
          height: "100%",
          width: "100%",
          borderRadius: AvatarStyles.container[this.props.size].borderRadius
        }}/>
      </View>
    );
  }
}

export default PackenUiAvatar;
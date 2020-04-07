import React, { Component } from "react";

import { View, Image } from "react-native";

class PackenUiAvatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[
        this.getStyles().container.base,
        this.getStyles().container.size[this.props.size]
      ]}>
        <Image
          source={this.props.src}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 100
          }}
        />
      </View>
    );
  }

  getStyles = () => {
    return {
      container: {
        base: {
          borderRadius: 100,
          overflow: "hidden"
        },
        size: {
          tiny: {
            height: 32,
            width: 32
          },
          small: {
            height: 40,
            width: 40
          },
          medium: {
            height: 64,
            width: 64
          },
          large: {
            height: 80,
            width: 80
          },
          giant: {
            height: 96,
            width: 96
          }
        }
      }
    };
  }
}

export default PackenUiAvatar;
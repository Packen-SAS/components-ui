import React, { Component } from "react";
import { View, Image } from "react-native"

import NotificationBannerStyles from "../styles/components/PackenNotificationBanner";
import Icon from "react-native-vector-icons/dist/Feather";

import PackenText from "./PackenText";

class PackenNotificationBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: props.theme,
      type: props.type
    }
  }

  getIcon = () => {
    let icon = null;

    if (this.props.icon) {
      if (this.props.icon === "packen") {
        let src = null;
        switch (this.state.theme) {
          case "success":
            src = require("../../assets/images/arrow_packen_success.png");
            break;
          case "primary":
            src = require("../../assets/images/arrow_packen_primary.png");
            break;
          case "warning":
            src = require("../../assets/images/arrow_packen_warning.png");
            break;
          case "danger":
            src = require("../../assets/images/arrow_packen_danger.png");
            break;
          case "info":
            src = require("../../assets/images/arrow_packen_info.png");
            break;
        };

        icon = (
          <Image
            style={NotificationBannerStyles.logo}
            source={src} />
        );
      } else {
        icon = (
          <Icon
            name={this.props.icon}
            size={NotificationBannerStyles.icon.base.size}
            style={{ marginRight: NotificationBannerStyles.icon.base.marginRight }}
            color={NotificationBannerStyles.icon.theme[this.state.theme].type[this.state.type].color}
          />
        )
      }
    }

    return icon;
  }

  render() {
    return (
      <View style={{
        ...NotificationBannerStyles.box.base,
        ...NotificationBannerStyles.box.theme[this.state.theme].type[this.state.type]
      }}>
        {this.getIcon()}
        <PackenText
          style={{
            ...NotificationBannerStyles.title.base,
            ...NotificationBannerStyles.title.theme[this.state.theme].type[this.state.type]
          }}>{this.props.title}</PackenText>
      </View>
    );
  }
}

export default PackenNotificationBanner;
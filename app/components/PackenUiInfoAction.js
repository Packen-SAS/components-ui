import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";
import Typography from "../styles/abstracts/typography";

class PackenUiInfoAction extends Component {
  constructor(props) {
    super(props);

    this.styles = this.createStyles();
  }

  getCaption = () => {
    let caption = null;

    if (this.props.caption) {
      caption = (
        <PackenUiText
          preset="c1"
          style={this.styles.caption}
        >{this.props.caption}</PackenUiText>
      );
    }

    return caption;
  }

  getSubtitle = () => {
    let subtitle = null;

    if (this.props.subtitle) {
      let icon = undefined;
      if (this.props.theme !== "primary") {
        let name = "";
        if (this.props.theme === "success") {
          name = "check-circle";
        } else {
          name = "x-circle";
        }
        
        icon = {
          name: name,
          position: "right",
          color: Colors[this.props.theme].default,
          size: Typography.c1.fontSize
        }
      }

      subtitle = (
        <PackenUiText
          preset="c1"
          icon={icon}
          style={this.styles.subtitle.theme[this.props.theme]}
        >{this.props.subtitle}</PackenUiText>
      );
    }

    return subtitle;
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.callback}>
        <View style={[this.styles.box.base, this.styles.box.theme[this.props.theme]]}>
          <Image source={this.props.img.src} style={this.styles.img} />
          <View style={this.styles.main}>
            <View style={this.styles.mainTop}>
              <PackenUiText preset="p1" style={this.styles.title}>{this.props.title}</PackenUiText>
              {this.getCaption()}
            </View>
            {this.getSubtitle()}
          </View>
          <Icon name={this.props.icon.name} size={this.props.icon.size} color={this.styles.icon.theme[this.props.theme].color} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  createStyles = () => {
    return {
      box: {
        base: {
          height: 56,
          borderWidth: 1,
          borderStyle: "solid",
          elevation: 2,
          paddingRight: 20,
          paddingLeft: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: Colors.basic.white.dft,
        },
        theme: {
          primary: {
            borderColor: Colors.brand.primary.drk
          },
          success: {
            borderColor: Colors.success.default
          },
          danger: {
            borderColor: Colors.danger.default
          }
        }
      },
      main: {
        flex: 1,
        paddingHorizontal: 10
      },
      mainTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
      },
      img: {
        width: this.props.img.width,
        height: this.props.img.height
      },
      title: {
        marginRight: 3,
        color: Colors.basic.independence.dft
      },
      caption: {
        color: Colors.basic.independence.dft
      },
      subtitle: {
        theme: {
          primary: {
            color: Colors.basic.gray.drk
          },
          success: {
            color: Colors.success.default
          },
          danger: {
            color: Colors.danger.default
          }
        }
      },
      icon: {
        theme: {
          primary: {
            color: Colors.brand.primary.drk
          },
          success: {
            color: Colors.success.default
          },
          danger: {
            color: Colors.danger.default
          }
        }
      }
    };
  }
}

export default PackenUiInfoAction;
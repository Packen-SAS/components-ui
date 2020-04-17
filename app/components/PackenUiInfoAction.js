import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";
import Typography from "../styles/abstracts/typography";

class PackenUiInfoAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: props.theme,
      title: props.title,
      caption: props.caption,
      subtitle: props.subtitle,
      callback: props.callback,
      img: { ...props.img },
      icon: { ...props.icon }
    }
  }

  getCaption = () => {
    let caption = null;

    if (this.state.caption) {
      caption = (
        <PackenUiText
          preset="c1"
          style={this.getStyles().caption}
        >{this.state.caption}</PackenUiText>
      );
    }

    return caption;
  }

  getSubtitle = () => {
    let subtitle = null;

    if (this.state.subtitle) {
      let icon = undefined;
      if (this.state.theme !== "primary") {
        let name = "";
        if (this.state.theme === "success") {
          name = "check-circle";
        } else {
          name = "x-circle";
        }

        icon = {
          name: name,
          position: "right",
          color: Colors[this.state.theme].default,
          size: Typography.c1.fontSize
        }
      }

      subtitle = (
        <PackenUiText
          preset="c1"
          icon={icon}
          style={this.getStyles().subtitle.theme[this.state.theme]}
        >{this.state.subtitle}</PackenUiText>
      );
    }

    return subtitle;
  }

  updateState = () => {
    this.setState({
      theme: this.props.theme,
      title: this.props.title,
      caption: this.props.caption,
      subtitle: this.props.subtitle,
      callback: this.props.callback,
      img: { ...this.props.img },
      icon: { ...this.props.icon }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.state.callback}>
        <View style={[this.getStyles().box.base, this.getStyles().box.theme[this.state.theme]]}>
          <Image source={this.state.img.src} style={this.getStyles().img} />
          <View style={this.getStyles().main}>
            <View style={this.getStyles().mainTop}>
              <PackenUiText preset="p1" style={this.getStyles().title}>{this.state.title}</PackenUiText>
              {this.getCaption()}
            </View>
            {this.getSubtitle()}
          </View>
          <Icon name={this.state.icon.name} size={this.state.icon.size} color={this.getStyles().icon.theme[this.state.theme].color} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  getStyles = () => {
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
        width: this.state.img.width,
        height: this.state.img.height
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
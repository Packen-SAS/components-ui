import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";
import Typography from "../styles/abstracts/typography";

class PackenUiInfoAction extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.setPropsToState() }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  mockCallback = () => false;

  setPropsToState = () => {
    return {
      theme: this.props.theme ? this.props.theme : "primary",
      title: this.props.title ? this.props.title : "",
      caption: this.props.caption ? this.props.caption : false,
      subtitle: this.props.subtitle ? this.props.subtitle : false,
      callback: this.props.callback ? this.props.callback : this.mockCallback,
      img: this.props.img ? { ...this.props.img } : {
        src: undefined,
        width: 0,
        height: 0
      },
      icon: this.props.icon ? { ...this.props.icon } : {
        name: "play",
        size: 14
      }
    };
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
    this.setState({ ...this.setPropsToState() });
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

PackenUiInfoAction.propTypes = {
  theme: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  subtitle: PropTypes.string,
  callback: PropTypes.func.isRequired,
  img: PropTypes.object,
  icon: PropTypes.object
};

export default PackenUiInfoAction;
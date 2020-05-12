import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiText from "./PackenUiText";

class PackenUiMapPinSub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: props.theme,
      icon: props.icon,
      label: props.label,
      dotPosition: props.dotPosition,
      type: props.type
    }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      theme: this.props.theme ? this.props.theme : "primary",
      icon: this.props.icon ? this.props.icon : false,
      label: this.props.label ? this.props.label : false,
      dotPosition: this.props.dotPosition ? this.props.dotPosition : false,
      type: this.props.type ? this.props.type : "info"
    };
  }

  getIconColor = () => {
    let color = this.getStyles().icon.type.icon.color;

    if (this.state.theme) {
      color = this.getStyles().icon.theme[this.state.theme].color;
    }

    return color;
  }

  getIcon = () => {
    let icon = null;

    if (this.state.icon) {
      icon = (
        <Icon
          name={this.state.icon}
          color={this.getIconColor()}
          size={this.getStyles().icon.type.icon.fontSize}
        />
      );
    }

    return icon;
  }

  getLabel = () => {
    let label = null;

    if (this.state.label) {
      label = (
        <PackenUiText
          style={{
            ...this.getStyles().character.base,
            ...this.getStyles().character.theme[this.state.theme]
          }}
        >
          {this.state.label.toUpperCase()}
        </PackenUiText>
      );
    }

    return label;
  }

  getDot = () => {
    let dot = null;

    if (this.state.dotPosition) {
      dot = (
        <View
          style={{
            ...this.getStyles().dot.base,
            ...this.getStyles().dot.positioning.type[this.state.type][this.state.dotPosition]
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
          ...this.getStyles().sub.base,
          ...this.getStyles().sub.type[this.state.type],
          ...this.getStyles().sub.theme[this.state.theme]
        }}
      >
        {this.getIcon()}
        {this.getLabel()}
        {this.getDot()}
      </View>
    );
  }

  getStyles = () => {
    return {
      dot: {
        base: {
          width: 6,
          height: 6,
          borderWidth: 2,
          borderRadius: 10,
          borderStyle: "solid",
          borderColor: Colors.basic.independence.drk,
          backgroundColor: Colors.brand.primary.dft,
          position: "absolute"
        },
        positioning: {
          type: {
            icon: {
              top: {
                top: -11,
                left: 13
              },
              right: {
                top: 13,
                right: -11
              },
              bottom: {
                left: 13,
                bottom: -11
              },
              left: {
                top: 13,
                left: -11
              }
            },
            info: {
              top: {
                top: -11,
                left: 9
              },
              right: {
                top: 9,
                right: -11
              },
              bottom: {
                left: 9,
                bottom: -11
              },
              left: {
                top: 9,
                left: -11
              }
            }
          }
        }
      },
      sub: {
        base: {
          position: "relative",
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.basic.independence.drk,
          ...Shadows.lg
        },
        type: {
          icon: {
            height: 32,
            width: 32
          },
          info: {
            height: 24,
            width: 24
          }
        },
        theme: {
          primary: {
            backgroundColor: Colors.basic.independence.drk
          },
          white: {
            backgroundColor: Colors.basic.independence.drk
          },
          white_primary: {
            backgroundColor: Colors.brand.secondary.dft
          }
        }
      },
      icon: {
        type: {
          icon: {
            fontSize: Typography.size.medium,
            color: Colors.brand.primary.dft
          },
          info: {
            fontSize: Typography.size.tiny
          }
        },
        theme: {
          primary: {
            color: Colors.brand.primary.dft
          },
          white: {
            color: Colors.brand.primary.dft
          },
          white_primary: {
            color: Colors.basic.white.dft
          }
        }
      },
      character: {
        base: {
          fontFamily: Typography.family.bold,
          fontSize: Typography.size.large,
          lineHeight: Typography.lineheight.huge,
          paddingBottom: 3
        },
        theme: {
          primary: {
            color: Colors.brand.primary.dft
          },
          white: {
            color: Colors.brand.primary.dft
          },
          white_primary: {
            color: Colors.basic.white.dft
          }
        }
      }
    };
  }
}

PackenUiMapPinSub.propTypes = {
  theme: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
  dotPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.string.isRequired
};

export default PackenUiMapPinSub;
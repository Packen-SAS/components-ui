import React, { Component } from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";

class PackenUiMapPinSub extends Component {
  constructor(props) {
    super(props);
  }

  getIconColor = () => {
    let color = this.getStyles().icon.type.icon.color;

    if (this.props.theme) {
      color = this.getStyles().icon.theme[this.props.theme].color;
    }

    return color;
  }

  getIcon = () => {
    let icon = null;

    if (this.props.icon) {
      icon = (
        <Icon
          name={this.props.icon}
          color={this.getIconColor()}
          size={this.getStyles().icon.type.icon.fontSize}
        />
      );
    }

    return icon;
  }

  getLabel = () => {
    let label = null;

    if (this.props.label) {
      label = (
        <PackenUiText
          style={{
            ...this.getStyles().character.base,
            ...this.getStyles().character.theme[this.props.theme]
          }}
        >
          {this.props.label.toUpperCase()}
        </PackenUiText>
      );
    }

    return label;
  }

  getDot = () => {
    let dot = null;

    if (this.props.dotPosition) {
      dot = (
        <View
          style={{
            ...this.getStyles().dot.base,
            ...this.getStyles().dot.positioning.type[this.props.type][this.props.dotPosition]
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
          ...this.getStyles().sub.type[this.props.type],
          ...this.getStyles().sub.theme[this.props.theme]
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
          shadowColor: Colors.basic.black.dft,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7
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

export default PackenUiMapPinSub;
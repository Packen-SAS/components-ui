import React, { Component } from "react";
import { View } from "react-native";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiMapPinSub from "./PackenUiMapPinSub";
import PackenUiText from "./PackenUiText";

class PackenUiMapPin extends Component {
  constructor(props) {
    super(props);
  }

  getLabel = () => {
    if (this.props.main.label) {
      return <PackenUiText style={{ ...this.getStyles().label.base, ...this.getStyles().label.theme[this.props.theme] }}>{this.props.main.label.toUpperCase() + " "}</PackenUiText>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={this.getStyles().container}>
        {
          this.props.type === "info" ? (
            <View style={this.getStyles().inner}>
              {
                this.props.sub && this.props.sub.position === "left" ? (
                  <PackenUiMapPinSub type={this.props.type} theme={this.props.theme} label={this.props.sub.character} icon={this.props.sub.icon} dotPosition={this.props.dotPosition} />
                ) : null
              }
              <View style={{ ...this.getStyles().main.base, ...this.getStyles().main.theme[this.props.theme] }}>
                <PackenUiText style={{ ...this.getStyles().text.base, ...this.getStyles().text.theme[this.props.theme] }}>
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

  getStyles = () => {
    return {
      container: {
        padding: 11
      },
      inner: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
        shadowColor: Colors.basic.black.dft,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: Shadows.md.elevation
      },
      main: {
        base: {
          height: 24,
          paddingVertical: 6,
          paddingHorizontal: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          shadowColor: Colors.basic.black.dft,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: Shadows.md.elevation
        },
        theme: {
          primary: {
            backgroundColor: Colors.brand.secondary.dft
          },
          white: {
            backgroundColor: Colors.basic.white.dft
          },
          white_primary: {
            backgroundColor: Colors.basic.white.dft
          }
        }
      },
      label: {
        base: {
          textAlign: "center",
          fontFamily: Typography.family.regular,
          fontSize: Typography.size.xtiny,
          lineHeight: Typography.lineheight.xtiny
        },
        theme: {
          primary: {
            color: Colors.brand.primary.ulgt
          },
          white: {
            color: Colors.basic.independence.drk
          },
          white_primary: {
            color: Colors.basic.independence.drk
          }
        }
      },
      text: {
        base: {
          textAlign: "center",
          fontFamily: Typography.family.regular,
          fontSize: Typography.size.xtiny,
          lineHeight: Typography.lineheight.xtiny
        },
        theme: {
          primary: {
            color: Colors.basic.white.dft
          },
          white: {
            color: Colors.basic.independence.drk
          },
          white_primary: {
            color: Colors.basic.independence.drk
          }
        }
      }
    };
  }
}

export default PackenUiMapPin;
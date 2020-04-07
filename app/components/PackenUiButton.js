import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native"

import Icon from "react-native-vector-icons/dist/Feather";

import Color from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import PackenUiText from "./PackenUiText";

class PackenUiButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      level: props.level,
      size: props.size,
      icon: this.getInitialIcon(),
      isDisabled: props.isDisabled,
      shapeHeight: 0,
      shapeWidth: 0,
      iconHeight: 0,
      iconWidth: 0,
      styles: this.getStyles(0, 0, 0, 0),
      children: props.children
    }
  }

  getInitialIcon = () => {
    return this.props.icon ? this.props.icon : undefined
  }

  getStyles = (shapeHeight, shapeWidth, iconHeight, iconWidth) => {
    /* console.log("------------------");
    console.log(shapeHeight, shapeWidth, iconHeight, iconWidth);
    console.log("------------------"); */
    let type, size, level, icon, isDisabled;
    if (this.state) {
      type = this.state.type;
      size = this.state.size;
      level = this.state.level;
      icon = this.state.icon;
      isDisabled = this.state.isDisabled;
    } else {
      type = this.props.type;
      size = this.props.size;
      level = this.props.level;
      icon = this.props.icon;
      isDisabled = this.props.isDisabled;
    }

    let styles = {
      shape: {
        ...this.createStyles().shape.base,
        ...this.createStyles().shape.type[type][size],
        ...this.createStyles().shape.level[level]
      },
      content: {
        position: "relative"
      },
      icon: {
        ...this.createStyles().icon.level[level],
        ...this.createStyles().icon.size[size]
      }
    };

    switch (type) {
      case "icon":
        styles = {
          ...styles,
          iconWrapper: {
            position: "absolute",
            top: (shapeHeight/2) - (iconHeight/2),
            left: (shapeWidth/2) - (iconWidth/2)
          }
        };
        break;
      case "regular":
        styles = {
          ...styles,
          label: {
            ...this.createStyles().label.base,
            ...this.createStyles().label.level[level],
            ...this.createStyles().label.size[size]
          },
          iconWrapper: {
            position: "absolute",
            top: (shapeHeight/2) - (iconHeight/2),
            right: icon ? icon.position === "left" ? "auto" : -(this.createStyles().label.size[size].marginHorizontal + (iconWidth/2)) : 0,
            left: icon ? icon.position === "right" ? "auto" : -(this.createStyles().label.size[size].marginHorizontal + (iconWidth/2)) : 0
          }
        };
        break;
    }

    /* Custom styles depending on the level */
    switch (level) {
      case "secondary":
        styles.shape = {
          ...styles.shape,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Color.secondary.default_drk
        }
        break;
    }

    /* Custom styles for isDisabled states */
    if (isDisabled) {
      styles.shape.backgroundColor = Color.base.disabled;
      styles.icon.color = Color.base.white;

      if (styles.label) {
        styles.label.color = Color.base.white;
      }

      if (styles.shape.borderWidth) {
        styles.shape.borderWidth = 0;
      }

      if (level === "ghost") {
        styles.shape.backgroundColor = Color.base.transparent;
        styles.icon.color = Color.base.disabled_alt;

        if (styles.label) {
          styles.label.color = Color.base.disabled_alt;
        }
      }
    }

    return styles;
  }

  checkStyles = () => {
    this.setState({
      styles: this.getStyles(this.state.shapeHeight, this.state.shapeWidth, this.state.iconHeight, this.state.iconWidth)
    });
  }

  updateState = () => {
    this.setState({
      type: this.props.type,
      level: this.props.level,
      size: this.props.size,
      icon: this.getInitialIcon(),
      isDisabled: this.props.isDisabled,
      children: this.props.children
    }, this.checkStyles);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  getShapeDimensions = e => {
    this.setState({
      shapeHeight: Math.floor(e.height),
      shapeWidth: Math.floor(e.width)
    }, this.checkStyles);
  }

  getIconDimensions = e => {
    this.setState({
      iconHeight: Math.floor(e.height),
      iconWidth: Math.floor(e.width)
    }, this.checkStyles);
  }

  executeCallback = () => {
    this.props.callback();
  }

  pressInHandler = () => {
    let newStyles = {...this.getStyles(this.state.shapeHeight, this.state.shapeWidth, this.state.iconHeight, this.state.iconWidth)}
    newStyles.shape.backgroundColor = Color[this.state.level].focus;

    /* Custom focus styles */
    switch (this.state.level) {
      case "secondary":
        newStyles.shape.borderColor = Color.secondary.focus;
        break;
    }

    this.setState({
      styles: newStyles
    });
  }

  pressOutHandler = () => {
    const newStyles = {...this.getStyles(this.state.shapeHeight, this.state.shapeWidth, this.state.iconHeight, this.state.iconWidth)}
    newStyles.shape.backgroundColor = Color[this.state.level].default;
    this.setState({
      styles: newStyles
    });
  }

  render() {
    return (
      <View pointerEvents={this.state.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.executeCallback} onPressIn={this.pressInHandler} onPressOut={this.pressOutHandler}>
          <View style={{ ...this.state.styles.shape, ...this.props.style }}>
            <View style={this.state.styles.shape__content} onLayout={e => { this.getShapeDimensions(e.nativeEvent.layout); }}>
              <PackenUiText style={this.state.styles.label}>{this.state.children}</PackenUiText>
              {
                this.state.icon ? (
                  <View style={this.state.styles.iconWrapper} onLayout={e => { this.getIconDimensions(e.nativeEvent.layout); }}>
                    <Icon name={this.state.icon.name} size={this.state.styles.icon.fontSize} color={this.state.styles.icon.color}/>
                  </View>
                ) : null
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  createStyles = () => {
    const iconSizeMultiplier = 1.5;
    return {
      shape: {
        base: {
          position: "relative",
          flexDirection: "row",
          alignSelf: "flex-start",
          alignItems: "center",
          justifyContent: "center"
        },
        size: {
          tiny: {
            minHeight: 24
          },
          small: {
            minHeight: 32
          },
          medium: {
            minHeight: 40
          },
          large: {
            minHeight: 48
          },
          giant: {
            minHeight: 56
          }
        },
        level: {
          primary: {
            backgroundColor: Color.primary.default
          },
          secondary: {
            backgroundColor: Color.secondary.default
          },
          tertiary: {
            backgroundColor: Color.tertiary.default
          },
          ghost: {
            backgroundColor: Color.ghost.default
          },
          danger: {
            backgroundColor: Color.danger.default
          }
        },
        type: {
          icon: {
            tiny: {
              height: 24,
              width: 24
            },
            small: {
              height: 32,
              width: 32
            },
            medium: {
              height: 40,
              width: 40
            },
            large: {
              height: 48,
              width: 48
            },
            giant: {
              height: 56,
              width: 56
            }
          },
          regular: {
            tiny: {
              paddingVertical: 6,
              paddingHorizontal: 32
            },
            small: {
              paddingVertical: 8,
              paddingHorizontal: 44
            },
            medium: {
              paddingVertical: 12,
              paddingHorizontal: 46
            },
            large: {
              paddingVertical: 14,
              paddingHorizontal: 56
            },
            giant: {
              paddingVertical: 17,
              paddingHorizontal: 74
            }
          }
        }
      },
      label: {
        base: {
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontFamily: Typography.family.bold
        },
        size: {
          tiny: {
            fontSize: Typography.size.tiny,
            lineHeight: Typography.lineheight.tiny,
            marginHorizontal: 10
          },
          small: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small,
            marginHorizontal: 11
          },
          medium: {
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.medium,
            marginHorizontal: 12
          },
          large: {
            fontSize: Typography.size.large,
            lineHeight: Typography.lineheight.large,
            marginHorizontal: 12
          },
          giant: {
            fontSize: Typography.size.giant,
            lineHeight: Typography.lineheight.giant,
            marginHorizontal: 22
          }
        },
        level: {
          primary: {
            color: Color.base.white
          },
          secondary: {
            color: Color.secondary.default_drk
          },
          tertiary: {
            color: Color.base.white
          },
          ghost: {
            color: Color.tertiary.default
          },
          danger: {
            color: Color.base.white
          }
        }
      },
      icon: {
        size: {
          tiny: {
            fontSize: Typography.size.tiny * iconSizeMultiplier
          },
          small: {
            fontSize: Typography.size.small * iconSizeMultiplier
          },
          medium: {
            fontSize: Typography.size.medium * iconSizeMultiplier
          },
          large: {
            fontSize: Typography.size.large * iconSizeMultiplier
          },
          giant: {
            fontSize: Typography.size.giant * iconSizeMultiplier
          }
        },
        level: {
          primary: {
            color: Color.base.white
          },
          secondary: {
            color: Color.secondary.default_drk
          },
          tertiary: {
            color: Color.base.white
          },
          ghost: {
            color: Color.tertiary.default
          },
          danger: {
            color: Color.base.white
          }
        }
      }
    };
  }
}

export default PackenUiButton;
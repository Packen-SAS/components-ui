import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View, Animated } from "react-native"

import Icon from "react-native-vector-icons/dist/Feather";

import Color from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import PackenUiText from "./PackenUiText";

class PackenUiButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      styles: this.getStyles()
    }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      type: this.props.type ? this.props.type : "regular",
      level: this.props.level ? this.props.level : "primary",
      size: this.props.size ? this.props.size : "medium",
      icon: this.props.icon ? this.props.icon : undefined,
      callback: this.props.callback ? this.props.callback : false,
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      nonTouchable: this.props.nonTouchable ? this.props.nonTouchable : false,
      children: this.props.children ? this.props.children : undefined,
      styling: this.props.styling ? { ...this.props.styling } : {
        shape: {},
        shapeContent: {},
        label: {},
        iconWrapper: {},
        iconSize: undefined,
        iconColor: undefined
      }
    };
  }

  getBaseStyles = (type, size, level) => {
    return {
      shape: {
        ...this.createStyles().shape.base,
        ...this.createStyles().shape.type[type][size],
        ...this.createStyles().shape.level[level]
      },
      shapeContent: {
        ...this.createStyles().shapeContent
      },
      icon: {
        ...this.createStyles().icon.level[level],
        ...this.createStyles().icon.size[size]
      }
    };
  }

  getTypeStyles = (styles, type, size, level) => {
    switch (type) {
      case "icon":
        styles = {
          ...styles
        };
        break;
      case "regular":
        styles = {
          ...styles,
          label: {
            ...this.createStyles().label.base,
            ...this.createStyles().label.level[level],
            ...this.createStyles().label.size[size]
          }
        };
        break;
    }
    return styles;
  }

  getLevelStyles = (styles, level) => {
    switch (level) {
      case "secondary":
        styles.shape = {
          ...styles.shape,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Color.basic.independence.dft
        }
        break;
    }
    return styles;
  }

  getDisabledStyles = (styles, isDisabled, level) => {
    if (isDisabled) {
      styles.shape.backgroundColor = Color.ghost.focus;
      styles.icon.color = Color.basic.white.dft;

      if (styles.label) {
        styles.label.color = Color.basic.white.dft;
      }

      if (styles.shape.borderWidth) {
        styles.shape.borderWidth = 0;
      }

      if (level === "ghost") {
        styles.shape.backgroundColor = Color.ghost.default;
        styles.icon.color = Color.base.disabled_alt;

        if (styles.label) {
          styles.label.color = Color.base.disabled_alt;
        }
      }
    }
    return styles;
  }

  getStyles = () => {
    const { type, size, level, isDisabled } = this.state ? this.state : this.setPropsToState();
    let styles = this.getBaseStyles(type, size, level);
    styles = this.getTypeStyles(styles, type, size, level);
    styles = this.getLevelStyles(styles, level);
    styles = this.getDisabledStyles(styles, isDisabled, level);
    return styles;
  }

  checkStyles = () => {
    this.setState({
      styles: this.getStyles()
    });
  }

  checkIconAnimState = () => {
    if (this.state.icon && this.state.icon.anim) {
      const { state, controller } = this.state.icon.anim;
      if (state === "done") {
        controller.stop();
      } else {
        controller.start();
      }
    }
  }

  updateState = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      this.checkStyles();
      this.checkIconAnimState();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  executeCallback = () => {
    if (this.state.callback) {
      this.state.callback();
    } else {
      return false;
    }
  }

  pressInHandler = () => {
    let newStyles = { ...this.getStyles() }
    newStyles.shape.backgroundColor = Color[this.state.level].focus;

    /* Custom focus styles */
    switch (this.state.level) {
      case "secondary":
        newStyles.shape.borderColor = Color.basic.gray.dft;
        break;
    }

    this.setState({
      styles: newStyles
    });
  }

  pressOutHandler = () => {
    const newStyles = { ...this.getStyles() }
    newStyles.shape.backgroundColor = Color[this.state.level].default;
    this.setState({
      styles: newStyles
    });
  }

  getIcon = () => {
    let icon = (
      <View style={{ ...this.state.icon.styles, ...this.state.styling.iconWrapper }}>
        <Icon name={this.state.icon.name} size={this.state.styling.iconSize ? this.state.styling.iconSize : this.state.styles.icon.fontSize} color={this.state.styling.iconColor ? this.state.styling.iconColor : this.state.styles.icon.color} />
      </View>
    );

    if (this.state.icon.anim) {
      icon = (
        <Animated.View style={{ ...this.state.icon.styles[this.state.icon.anim.state], ...this.state.styling.iconWrapper }}>
          <Icon name={this.state.icon.name} size={this.state.styling.iconSize ? this.state.styling.iconSize : this.state.styles.icon.fontSize} color={this.state.styling.iconColor ? this.state.styling.iconColor : this.state.styles.icon.color} />
        </Animated.View>
      );
    }

    return icon;
  }

  getContent = () => {
    let content = null;

    if (this.state.type === "icon") {
      content = this.getIcon();
    } else if (this.state.type === "regular") {
      content = (
        <React.Fragment>
          {this.state.icon && this.state.icon.position === "left" ? this.getIcon() : null}
          <PackenUiText style={{ ...this.state.styles.label, ...this.state.styling.label }}>{this.state.children}</PackenUiText>
          {this.state.icon && this.state.icon.position === "right" ? this.getIcon() : null}
        </React.Fragment>
      );
    }

    return content;
  }

  render() {
    return (
      <View pointerEvents={this.state.isDisabled || this.state.nonTouchable ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.executeCallback} onPressIn={this.pressInHandler} onPressOut={this.pressOutHandler}>
          <View style={{ ...this.state.styles.shape, ...this.props.style, ...this.state.styling.shape }}>
            <View style={{ ...this.state.styles.shapeContent, ...this.state.styling.shapeContent }}>
              {this.getContent()}
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
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
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
            backgroundColor: Color.brand.primary.drk
          },
          secondary: {
            backgroundColor: Color.basic.white.drk
          },
          tertiary: {
            backgroundColor: Color.basic.independence.dft
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
      shapeContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%"
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
            color: Color.basic.white.dft
          },
          secondary: {
            color: Color.basic.independence.dft
          },
          tertiary: {
            color: Color.basic.white.dft
          },
          ghost: {
            color: Color.basic.independence.dft
          },
          danger: {
            color: Color.basic.white.dft
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
            color: Color.basic.white.dft
          },
          secondary: {
            color: Color.basic.independence.dft
          },
          tertiary: {
            color: Color.basic.white.dft
          },
          ghost: {
            color: Color.basic.independence.dft
          },
          danger: {
            color: Color.basic.white.dft
          }
        }
      }
    };
  }
}

PackenUiButton.propTypes = {
  type: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  icon: PropTypes.object,
  callback: PropTypes.func,
  isDisabled: PropTypes.bool,
  nonTouchable: PropTypes.bool,
  children: PropTypes.node,
  styling: PropTypes.object
};

export default PackenUiButton;
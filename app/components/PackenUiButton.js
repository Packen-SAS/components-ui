import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View, Animated, PanResponder, Image } from "react-native"

import Icon from "react-native-vector-icons/dist/Feather";
import Color from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiSvgIcon from "./PackenUiSvgIcon";
import PackenUiText from "./PackenUiText";

class PackenUiButton extends Component {
  constructor(props) {
    super(props);

    this.anim = {};
    this.animating = false;
    this.panned = false;

    this.state = {
      ...this.setPropsToState(),
      styles: this.getStyles(),
      fade: new Animated.Value(1),
      translateX: new Animated.Value(5),
      swipeOpacity: new Animated.Value(1),
      swipeAnimation: new Animated.Value(0),
      called: false,
      swt: 0,
      swo: 1
    }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
    if (this.state.panned) {
      this.animateHandler();
    }
  }

  setPropsToState = () => {
    return {
      type: this.props.type ? this.props.type : "regular",
      level: this.props.level ? this.props.level : "primary",
      size: this.props.size ? this.props.size : "medium",
      icon: this.props.icon ? this.props.icon : undefined,
      callback: this.props.callback ? this.props.callback : false,
      isOutline: this.props.isOutline ? this.props.isOutline : false,
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      nonTouchable: this.props.nonTouchable ? this.props.nonTouchable : false,
      children: this.props.children ? this.props.children : undefined,
      panned: this.props.panned ? this.props.panned : false,
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

  animateHandler = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.translateX, {
          toValue: 19,
          duration: 600
        }),
        Animated.timing(this.state.fade, {
          toValue: 0,
          duration: 600
        })
      ])
    ).start();
  }

  createPanResponder = () => (
    PanResponder.create({
      onMoveShouldSetResponderCapture: this.onMoveShouldSetResponder,
      onMoveShouldSetPanResponderCapture: this.onMoveShouldPanResponder,
      onPanResponderGrant: this.onPanResponderGrant,
      onShouldBlockNativeResponder: this.onShouldNativeResponder,
      onPanResponderTerminationRequest: this.onPanResponderRequest,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    }));

  onMoveShouldSetResponder = () => true;

  onMoveShouldPanResponder = () => true;

  onPanResponderGrant = (evt, gestureState) => null;

  onShouldNativeResponder = (evt, gestureState) => true;

  onPanResponderRequest = (evt, gestureState) => true;

  onPanResponderMove = (evt, mov) => {
    const { swipeAnimation, swipeOpacity, swt, swo, called } = this.state;
    if (mov.dx <= 0) { return 0; }
    if (swt >= 85) {
      if (called === false) {
        return this.setState({ called: true }, this.executeCallback);
      }
    } else {
      const _swt = (((mov.moveX - 85) - mov.dx));
      const _swo = swo - (mov.vx - 0.020)
      swipeAnimation.setValue(_swt);
      swipeOpacity.setValue(_swo);
      return this.setState({ swt: _swt, swo: _swo })
    }
  }

  onPanResponderRelease = (evt, gestureState) => {
    const { swipeAnimation, swipeOpacity } = this.state;
    swipeAnimation.setValue(0);
    swipeOpacity.setValue(1);
    return this.setState({ called: false, swt: 0, swo: 1 });
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

  getOutlineStyles = (styles, isOutline, level) => {
    if (isOutline) {
      styles = {
        ...styles,
        shape: { ...styles.shape, ...this.createStyles().shape.outline[level] },
        label: { ...styles.label, ...this.createStyles().label.outline[level] },
        icon: { ...styles.icon, ...this.createStyles().icon.outline[level] }
      }
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
    const { type, size, level, isOutline, isDisabled } = this.state ? this.state : this.setPropsToState();
    let styles = this.getBaseStyles(type, size, level);
    styles = this.getTypeStyles(styles, type, size, level);
    styles = this.getLevelStyles(styles, level);
    styles = this.getOutlineStyles(styles, isOutline, level);
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
    if (this.state.level !== "ghost" && this.state.level !== "secondary") {
      if (this.state.type === "regular") {
        newStyles.label.color = Color.basic.white.dft;
      }
      if (this.state.icon) {
        newStyles.icon.color = Color.basic.white.dft;
      }
      if (this.state.isOutline) {
        newStyles.shape.borderColor = Color[this.state.level].focus;
      }
    }

    /* Custom focus styles */
    switch (this.state.level) {
      case "secondary":
        newStyles.shape.borderColor = Color.basic.gray.dft;
        break;
    }

    this.setState({
      styles: newStyles
    });

    return newStyles;
  }

  pressOutHandler = () => {
    let newStyles = { ...this.getStyles() }
    newStyles.shape.backgroundColor = Color[this.state.level].default;
    if (this.state.level !== "ghost" && this.state.level !== "secondary") {
      if (this.state.type === "regular") {
        newStyles.label.color = Color.basic.white.dft;
      }
      if (this.state.icon) {
        newStyles.icon.color = Color.basic.white.dft;
      }
      if (this.state.isOutline) {
        newStyles = this.getOutlineStyles(newStyles, true, this.state.level);
      }
    }

    this.setState({
      styles: newStyles
    });

    return newStyles;
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

  getStaticButton = () => (
    <TouchableWithoutFeedback onPress={this.executeCallback} onPressIn={this.pressInHandler} onPressOut={this.pressOutHandler}>
      <View style={{ ...this.state.styles.shape, ...this.props.style, ...this.state.styling.shape }}>
        <View style={{ ...this.state.styles.shapeContent, ...this.state.styling.shapeContent }}>
          {this.getContent()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

  getPannedButton = () => (
    <View
      {...this.createPanResponder().panHandlers}
      style={{
        ...this.state.styles.shape,
        ...this.props.style,
        paddingLeft: 25,
        paddingRight: 0,
        borderRadius: this.createStyles().shape.size[this.state.size].minHeight,
        ...this.state.styling.shape
      }}
    >
      <Animated.View style={{
        opacity: this.state.fade,
        transform: [{ translateX: this.state.translateX }]
      }}>
        <PackenUiSvgIcon name="swipe" width={32} height={24} />
      </Animated.View>
      <Animated.View style={{
        ...this.state.styles.shapeContent,
        ...this.state.styling.shapeContent,
        opacity: this.state.swipeOpacity,
        transform: [{ translateX: this.state.swipeAnimation }],
      }}>
        <View style={{ ...this.state.styles.shapeContent, ...this.state.styling.shapeContent }}>
          {this.getContent()}
        </View>
      </Animated.View>
    </View>
  )

  render() {
    return (
      <View pointerEvents={this.state.isDisabled || this.state.nonTouchable ? "none" : "auto"}>
        {this.state.panned && this.state.type !== "icon" ? this.getPannedButton() : this.getStaticButton()}
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
          width: "100%",
          overflow: "hidden"
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
        },
        outline: {
          primary: {
            backgroundColor: Color.brand.primary.snw,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.brand.primary.drk
          },
          secondary: {
            backgroundColor: Color.basic.white.drk,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.basic.independence.dft
          },
          tertiary: {
            backgroundColor: Color.basic.independence.lgt,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.basic.independence.drk
          },
          ghost: {
            backgroundColor: Color.ghost.default,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.basic.independence.dft
          },
          danger: {
            backgroundColor: Color.danger.lgt,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.danger.default
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
        },
        outline: {
          primary: {
            color: Color.brand.primary.drk
          },
          secondary: {
            color: Color.basic.independence.dft
          },
          tertiary: {
            color: Color.basic.independence.drk
          },
          ghost: {
            color: Color.basic.independence.dft
          },
          danger: {
            color: Color.danger.default
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
        },
        outline: {
          primary: {
            color: Color.brand.primary.drk
          },
          secondary: {
            color: Color.basic.independence.dft
          },
          tertiary: {
            color: Color.basic.independence.drk
          },
          ghost: {
            color: Color.basic.independence.dft
          },
          danger: {
            color: Color.danger.default
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
  isOutline: PropTypes.bool,
  isDisabled: PropTypes.bool,
  nonTouchable: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.object,
  styling: PropTypes.object,
  panned: PropTypes.bool
};

export default PackenUiButton;